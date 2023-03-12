const ChartBar = ({ items }) => {
  const maxValue = items[0].data;

  return (
    <div
      style={{
        height: 200,
        padding: 10,
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {items?.map((item) => (
        <div
          style={{
            width: 20,
            borderRadius: 5,
            margin: 5,
            backgroundColor: "green",
            height: (item.data / maxValue) * 100 + "%",
          }}
        >
          {item.name}
          {item.data}
        </div>
      ))}
    </div>
  );
};

export default ChartBar;
