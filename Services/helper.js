export const get_setting = (key, defaultValue = "") => {
  var settings = localStorage.getItem("tokenwala_settings");
  if (!settings) return defaultValue;
  settings = JSON.parse(settings);
  if (!settings[key]) return defaultValue;
  return settings[key];
};

export const wooconvo_makeid = (length = 6) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const _to_options = (options) => {
  return Object.keys(options).map((b) => ({
    value: b,
    label: options[b],
  }));
};

export function get_job_thumb(job) {
  return (
    <img
      src={process.env.PUBLIC_URL + "/download-icon.png"}
      width="75"
      alt={job.orderID}
    />
  );
}

export function get_user_role(user) {
  let roles = [...user.roles];

  if (roles.includes("administrator")) return "admin";
  if (roles.includes("trainer")) return "vendor";
  if (roles.includes("customer")) return "customer";
}
