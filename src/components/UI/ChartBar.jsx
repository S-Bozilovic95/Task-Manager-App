import classes from "./ChartBar.module.scss";

const ChartBar = ({ items, title }) => {
  const maxValue = items[0].data;

  return (
    <div className={classes.chart}>
      <h4>{title}</h4>
      {items?.map((item) => (
        <div className={classes["chart-box"]}>
          <div className={classes["text-box"]}>
            <p>{item.name}</p>
          </div>
          <div
            className={classes.bar}
            style={{
              width: (item.data / maxValue) * 100 + "%",
            }}
          >
            <p> {item.data}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartBar;
