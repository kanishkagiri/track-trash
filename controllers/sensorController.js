const db = require("../config/db");

exports.updateSensorData = (req, res) => {
  const { bin_id, fill_level } = req.body;

  if (bin_id === undefined || fill_level === undefined) {
    return res.status(400).json({ message: "bin_id and fill_level required" });
  }

  // Decide bin status
  let status = "active";
  if (fill_level >= 80) status = "full";
  else if (fill_level === 0) status = "empty";

  // Insert sensor reading
  db.query(
    "INSERT INTO sensor_data (bin_id, fill_level) VALUES (?, ?)",
    [bin_id, fill_level],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }

      // Update bin table
      db.query(
        "UPDATE bins SET current_fill=?, status=? WHERE id=?",
        [fill_level, status, bin_id],
        (err2) => {
          if (err2) {
            console.error(err2);
            return res.status(500).json({ error: err2.message });
          }

          res.status(200).json({
            message: "Sensor data updated",
            bin_id,
            fill_level,
            status
          });
        }
      );
    }
  );
};
