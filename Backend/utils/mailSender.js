const fetch = require("node-fetch");

const mailSender = async (email, title, body) => {
  try {
    const response = await fetch(
      "https://mail-sender-blond.vercel.app/api/send-mail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Study Notion",
          to: email,
          subject: title,
          html: body,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Mail API failed");
    }

    return data;
  } catch (err) {
    console.error("Mail send failed:", err.message);
    throw err;
  }
};

module.exports = mailSender;
