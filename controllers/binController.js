const db =require("../config/db");

exports.addBin = (req, res) => {
  const { location, capacity } = req.body;

  if (!location || !capacity) {
    return res.status(400).json({ message: "Location and capacity required" });
  }

  const sql =
    "INSERT INTO bins (location, capacity, status) VALUES (?, ?, 'empty')";

  db.query(sql, [location, capacity], (err, result) => {
    if (err) {
      console.error("MYSQL ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      message: "Bin added successfully",
      binId: result.insertId
    });
  });
};

    exports.getAllBins = (req, res) => {
        const sql = "SELECT * FROM bins";
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Something went wrong" });
            }
            res.status(200).json(result);
        });
    }


    exports.updateBinFill=(req,res)=>{
         const { id } = req.params;
        const { current_fill } = req.body;

  let status = "active";
  if (current_fill >= 80) status = "full";
  else if (current_fill === 0) status = "empty";

  const sql =
    "UPDATE bins SET current_fill=?, status=? WHERE id=?";

  db.query(sql, [current_fill, status, id], (err) => {
   if (err) {
  console.error("MYSQL ERROR:", err);
  return res.status(500).json({ error: err.message });
}

    res.status(200).json({ message: "Bin updated successfully" });
  });
};
      