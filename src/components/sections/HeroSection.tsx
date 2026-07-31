import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { heroBanners, HERO_BANNER_DURATION } from "@/data/heroBanners";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Silk from "@/components/Silk";
import "./HeroSection.css";

gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const progressTween = useRef<gsap.core.Tween | null>(null);
  const [progress, setProgress] = useState(0);
  const animatingRef = useRef(false);

  const current = heroBanners[active] ?? heroBanners[0];

  const goTo = useCallback(
    (index: number, instant = false) => {
      const root = slidesRef.current;
      if (!root || animatingRef.current) return;

      const slides = Array.from(root.querySelectorAll<HTMLElement>(".hero__slide"));
      if (!slides.length) return;

      const next = ((index % slides.length) + slides.length) % slides.length;
      const prev = activeRef.current;
      if (next === prev && !instant) return;

      const nextSlide = slides[next];
      const prevSlide = slides[prev];
      const nextImg = nextSlide.querySelector("img");
      const prevImg = prevSlide?.querySelector("img");

      progressTween.current?.kill();
      setProgress(0);

      if (reduced || instant) {
        slides.forEach((slide, i) => {
          gsap.set(slide, { autoAlpha: i === next ? 1 : 0, zIndex: i === next ? 2 : 0 });
        });
        activeRef.current = next;
        setActive(next);
        return;
      }

      animatingRef.current = true;
      activeRef.current = next;
      setActive(next);

      gsap.set(nextSlide, { autoAlpha: 1, zIndex: 2 });
      gsap.set(prevSlide, { zIndex: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          slides.forEach((slide, i) => {
            if (i !== next) gsap.set(slide, { autoAlpha: 0, zIndex: 0 });
          });
          animatingRef.current = false;
        },
      });

      tl.fromTo(nextSlide, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.1 }, 0);

      if (nextImg) {
        tl.fromTo(
          nextImg,
          { scale: 1.08 },
          { scale: 1, duration: 1.35, ease: "power1.out" },
          0,
        );
      }

      tl.to(prevSlide, { autoAlpha: 0, duration: 1 }, 0.08);

      if (prevImg) {
        tl.to(prevImg, { scale: 1.06, duration: 1.1 }, 0);
      }

      if (copyRef.current) {
        tl.fromTo(
          copyRef.current.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power2.out" },
          0.15,
        );
      }
    },
    [reduced],
  );

  const startCycle = useCallback(() => {
    progressTween.current?.kill();
    setProgress(0);
    if (reduced) return;

    const state = { value: 0 };
    progressTween.current = gsap.to(state, {
      value: 1,
      duration: HERO_BANNER_DURATION,
      ease: "none",
      onUpdate: () => setProgress(state.value),
      onComplete: () => goTo(activeRef.current + 1),
    });
  }, [goTo, reduced]);

  useGSAP(
    () => {
      const root = slidesRef.current;
      if (!root) return;
      const slides = root.querySelectorAll<HTMLElement>(".hero__slide");
      gsap.set(slides, { autoAlpha: 0, zIndex: 0 });
      gsap.set(slides[0], { autoAlpha: 1, zIndex: 2 });

      if (!reduced && copyRef.current) {
        gsap.fromTo(
          [root.parentElement, copyRef.current, ".hero__pager"],
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform",
          },
        );
      }
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  useEffect(() => {
    startCycle();
    const onVisibility = () => {
      if (document.hidden) progressTween.current?.pause();
      else progressTween.current?.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      progressTween.current?.kill();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active, startCycle]);

  return (
    <section ref={rootRef} className="hero" aria-roledescription="carrossel">
      {!reduced ? (
        <div className="hero__silk" aria-hidden="true">
          <Silk speed={5} scale={1} color="#2a242e" noiseIntensity={1.5} rotation={0} />
        </div>
      ) : null}

      <div className="hero__frame">
        <div className="hero__slides" ref={slidesRef} aria-hidden="true">
          {heroBanners.map((banner, index) => (
            <div key={banner.id} className="hero__slide">
              <img
                src={banner.src}
                alt=""
                width={1920}
                height={1080}
                fetchPriority={index === 0 ? "high" : "low"}
                decoding="async"
                loading={index === 0 ? "eager" : "lazy"}
                style={{ objectPosition: banner.position ?? "center center" }}
              />
            </div>
          ))}
        </div>

        <div className="hero__scrim" aria-hidden="true" />

        <div className="hero__content" ref={copyRef}>
          {current.eyebrow ? <p className="hero__eyebrow">{current.eyebrow}</p> : null}
          <h1 className="font-display hero__title">
            {current.title}
            {current.titleAccent ? (
              <>
                <br />
                <span className="hero__title-accent">{current.titleAccent}</span>
              </>
            ) : null}
          </h1>
          {current.lead ? <p className="hero__lead">{current.lead}</p> : null}
        </div>

        <div className="hero__pager" role="tablist" aria-label="Banners do hero">
          {heroBanners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Ir para banner ${index + 1}`}
              className={`hero__dot ${index === active ? "is-active" : ""}`}
              onClick={() => goTo(index)}
            >
              <span
                className="hero__dot-fill"
                style={{
                  transform: `scaleX(${index === active ? progress : 0})`,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
