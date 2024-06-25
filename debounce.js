const debounce = (cb, d) => {
  let time;
  return function (...args) {
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      cb(...args);
    }, d);
  };
};

const handleChange = debounce((event) => {}, 1000);

{
  /* <input onChange={(event) => handleChange(event)} /> */
}