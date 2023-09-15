import overlay from "../../assets/overlay.png";

const Banner = () => {
  return (
    <div className="banner">
      <div className="title">Welcome to Ensemble!</div>
      <div className="sub">
        Get started and let the ensemble of AI models bring your ideas to life.
      </div>
      <button>Explore more</button>

      <img src={overlay}></img>
    </div>
  );
};

export default Banner;
