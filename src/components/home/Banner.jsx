import ParticlesBg from "particles-bg";
import { Link } from "react-router-dom";

const Banner = () => {
  // Particle configuration
  let config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-40, 40],
    alpha: [0.6, 0],
    scale: [0.1, 0.4],
    position: "all",
    color: ["random", "#ff0000"],
    cross: "dead",
    random: 15,
  };

  // Add custom particle rendering logic conditionally
  if (Math.random() > 0.85) {
    config = Object.assign(config, {
      onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(
          particle.p.x,
          particle.p.y,
          particle.radius * 2,
          particle.radius * 2
        );
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
      },
    });
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Animation */}
      <ParticlesBg
        type="custom"
        config={config} // Pass the custom config here
        bg={{
          position: "absolute",
          zIndex: 10,
          top: 0,
          left: 0,
        }}
      />

      <div className="hero min-h-screen relative z-30 flex flex-col justify-center items-center text-center container mx-auto">
        <h1 className="mb-5 text-4xl font-bold">
          Turn Ideas into Blogs Instantly with
        </h1>
        <h1 className="mb-5 text-7xl font-bold lobsterFont text-red-500">Ai</h1>
        <p className="mb-5 max-w-xl mx-auto">
          Boost your creativity and productivity with our AI-powered writing
          tool. Instantly transform your ideas into engaging blogs. Say goodbye
          to writer&apos;s block and hello to effortless content creation!
        </p>
        <Link to={"/createBlog"} className="button-style2 uppercase">
          Write Now
        </Link>
      </div>
    </div>
  );
};

export default Banner;
