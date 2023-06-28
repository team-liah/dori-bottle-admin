const Regexp = {
  emailRegexp: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
  phoneRegexp: /^(\d{2,3}-\d{3,4}-\d{4}$)|^\d{2,3}\d{3,4}\d{4}$/,
  haxColorRegexp: /^#[0-9A-F]{6}$/i,
  passwordRegexp: /^(?=.*[A-Za-z])(?=.*[\d]).{8,}$/,
  nameRegexp: /^[가-힣a-zA-Z]+$/,
};

export default Regexp;
