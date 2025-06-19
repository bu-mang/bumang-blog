"use client";

export default function InteractiveBackground() {
  const random = Math.floor(Math.random() * 10);

  switch (random) {
    case 0:
    default:
      return (
        <section className="fixed left-0 top-0 -z-10 h-screen w-screen"></section>
      );
  }
}
