import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Feedback() {
  let [star, setStar] = useState(0);
  let [feedback, setFeedback] = useState({});
  let [listFeedback, setlistFeedback] = useState([]);

  let handleStar = (star) => {
    setStar(star);
    let feed = { ...feedback, ["star"]: star };
    setFeedback(feed);
  };

  let handleChnage = (e) => {
    let { name, value } = e.target;
    let feed = { ...feedback, [name]: value };
    setFeedback(feed);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let newFeedback = [...listFeedback, feedback];
    setlistFeedback(newFeedback);
    setStar(0);
    setFeedback({});
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Feedback</h2>
      <form method="post" onSubmit={handleSubmit}>
        {[1, 2, 3, 4, 5].map((v, i) => (
          <FaStar
            key={i}
            color={star >= v ? "yellow" : "gray"}
            onMouseOver={() => handleStar(v)}
          />
        ))}
        <br /> <br />
        <textarea
          name="feedback"
          id=""
          onChange={handleChnage}
          value={feedback.feedback || ""}
        ></textarea>
        <br /> <br />
        <input type="submit" value="Add feedback" />
      </form>
      <br /> <br />
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px" }}>
        {listFeedback.map((val, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              width: "300px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>
              {[1, 2, 3, 4, 5].map((v, i) => (
                <FaStar key={i} color={val.star >= v ? "yellow" : "gray"} />
              ))}
            </div>
            <p>{val.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
