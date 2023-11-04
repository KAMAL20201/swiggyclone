import UnServiceImage from "../../assets/UnserviceAble.webp";
import classes from './styles.module.css';
const UnServiceAble = () => {
  return (
    <div className={classes.UnServiceAbleCon}>
      <img src={UnServiceImage} alt="error" width={300} height={"50%"} />
      <h3>Location Unserviceable</h3>
      <p>We don’t have any services here till now. Try changing location.</p>
    </div>
  );
};


export default UnServiceAble;