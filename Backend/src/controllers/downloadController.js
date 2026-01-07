import https from "https";
import { URL } from "url";

export const downloadPdf = async (req, res) => {
  try {
    const { url, name } = req.query;
    if (!url) return res.status(400).send("Missing URL");

    const fileUrl = new URL(url);
    const filename = name ? `${name}.pdf` : "note.pdf";

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    https.get(fileUrl, stream => stream.pipe(res));
  } catch (err) {
    console.error("DOWNLOAD ERROR", err);
    res.status(500).send("Download failed");
  }
};
