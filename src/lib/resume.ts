import resumeAsset from "@/assets/resume.pdf.asset.json";

export const resume = { url: resumeAsset.url, filename: "Guru_Naveen_Badvel_Resume.pdf" };

export async function downloadResume() {
  const response = await fetch(resume.url);
  if (!response.ok) throw new Error("The resume could not be downloaded. Please use View Resume and try again.");
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = resume.filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}