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

export function time_elapsed(the_date) {
  // Create a date object with your desired date and time
  var date = new Date(the_date);

  // Get the current date and time
  var now = new Date();

  // Calculate the difference in milliseconds
  var diff = now.getTime() - date.getTime();

  // Convert milliseconds to minutes
  var minutes = Math.floor(diff / 1000 / 60);

  // Define a threshold for each time unit
  var minuteThreshold = 60; // 60 minutes in an hour
  var hourThreshold = 24 * minuteThreshold; // 24 hours in a day
  var dayThreshold = 30 * hourThreshold; // 30 days in a month (approximate)

  // Check which time unit is appropriate for the elapsed time
  if (minutes < minuteThreshold) {
    // Return the result in minutes
    return `${minutes} minutes ago`;
  } else if (minutes < hourThreshold) {
    // Convert minutes to hours and round to the nearest integer
    var hours = Math.round(minutes / minuteThreshold);
    // Return the result in hours
    return `${hours} hours ago`;
  } else if (minutes < dayThreshold) {
    // Convert minutes to days and round to the nearest integer
    var days = Math.round(minutes / hourThreshold);
    // Return the result in days
    return `${days} days ago`;
  } else {
    // Return a message that the elapsed time is too long
    return `More than a month ago`;
  }
}
