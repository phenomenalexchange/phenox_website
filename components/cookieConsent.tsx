"use client";

import Link from "next/link";
import { useState } from "react";

const COOKIE_NAME = "phenox_cookie_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

type ConsentChoice = "accepted" | "declined";

function getConsentChoice(): ConsentChoice | null {
  const consentCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));

  const choice = consentCookie?.split("=")[1];
  return choice === "accepted" || choice === "declined" ? choice : null;
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(
    () => typeof document !== "undefined" && getConsentChoice() === null,
  );

  const saveChoice = (choice: ConsentChoice) => {
    document.cookie = `${COOKIE_NAME}=${choice}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl bg-primary-black p-5 text-primary-white shadow-2xl md:inset-x-auto md:bottom-6 md:p-6"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <div>
          <h2 className="text-lg font-semibold">Cookies on PhenoX</h2>
          <p className="mt-2 text-sm leading-6 text-gray-300-custom">
            We use essential cookies to keep the website secure and working
            properly. Read our <Link href="/privacy-policy" className="underline hover:text-accent-yellow">Privacy Policy</Link> for more information.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => saveChoice("declined")}
            className="rounded-full border border-gray-600 px-4 py-2 text-sm font-semibold text-gray-300-custom transition-colors hover:border-primary-white hover:text-primary-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => saveChoice("accepted")}
            className="rounded-full bg-accent-yellow px-4 py-2 text-sm font-semibold text-primary-black transition-colors hover:bg-yellow-300"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
}
