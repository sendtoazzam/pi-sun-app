"use client";
import { useEffect, useState } from "react";
import { getSunCircumference, getCurrentPiValue, login } from "@/lib/api";
import SunVisual from "@/components/SunVisual";

export default function Home() {
  const [circumference, setCircumference] = useState(null);
  const [pi, setPi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await login();
        if (user?.accessToken) {
          const value = await getSunCircumference(user?.accessToken);
          setCircumference(value);

          const piValue = await getCurrentPiValue(user?.accessToken);
          setPi(piValue);
        } else {
          throw new Error("User authentication failed");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 p-4">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 p-4">
      <div className="w-full h-[400px]">
        <SunVisual circumference={circumference} />
      </div>
      <div className="text-center text-xl">
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <p>Current π value ≈ <strong>{pi}</strong></p>
            <p>
              Circumference of the Sun:{" "}
              {circumference ? (
                <strong>{circumference.toLocaleString()} meters</strong>
              ) : (
                <em>Loading...</em>
              )}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
