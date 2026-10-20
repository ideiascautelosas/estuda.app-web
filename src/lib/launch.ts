// Before the official launch the site shows only the pre-launch page
// (components/PreLaunch) plus the legal pages; pricing, checkout and the
// /assinatura routes come back when NEXT_PUBLIC_PRELAUNCH is "false".
// Read at build time: changing it on Netlify needs a new deploy.
export const PRELAUNCH = process.env.NEXT_PUBLIC_PRELAUNCH?.trim() !== "false";

// Where "Quero ser avisado" sends people until there's a signup form.
export const LAUNCH_CONTACT_EMAIL = "geral@estuda.app";
