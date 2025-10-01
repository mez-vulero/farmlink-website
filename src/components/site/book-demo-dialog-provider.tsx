"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type PropsWithChildren,
} from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, X } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  organization: string;
  phone: string;
  preferredDate: string;
  message: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

type BookDemoDialogContextValue = {
  openDialog: () => void;
};

const BookDemoDialogContext = createContext<BookDemoDialogContextValue | undefined>(undefined);

const initialState: FormState = {
  name: "",
  email: "",
  organization: "",
  phone: "",
  preferredDate: "",
  message: "",
};

export function useBookDemoDialog() {
  const context = useContext(BookDemoDialogContext);

  if (!context) {
    throw new Error("useBookDemoDialog must be used within a BookDemoDialogProvider");
  }

  return context;
}

export function BookDemoDialogProvider({ children }: PropsWithChildren) {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = useCallback(() => {
    setFormState(initialState);
    setStatus("idle");
    setError(null);
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setFormState(initialState);
    setStatus("idle");
    setError(null);
  }, []);

  useEffect(() => {
    if (!isDialogOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDialog, isDialogOpen]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((previous) => ({ ...previous, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);

      if (!formState.name.trim() || !formState.email.trim()) {
        setError("Please add your name and email so we know how to reach you.");
        setStatus("error");
        return;
      }

      setStatus("loading");

      try {
        const response = await fetch("/api/book-demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { error?: string } | null;
          setError(data?.error ?? "We could not submit your request. Please try again.");
          setStatus("error");
          return;
        }

        setStatus("success");
        setFormState(initialState);
      } catch (submitError) {
        console.error("Book demo request failed", submitError);
        setError("We could not reach the booking service. Check your connection and try again.");
        setStatus("error");
      }
    },
    [formState],
  );

  const contextValue = useMemo(
    () => ({
      openDialog,
    }),
    [openDialog],
  );

  return (
    <BookDemoDialogContext.Provider value={contextValue}>
      {children}
      {isDialogOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={closeDialog}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-demo-title"
            className="relative z-10 w-full max-w-2xl rounded-3xl border border-primary/15 bg-white/90 p-8 shadow-2xl shadow-primary/20 backdrop-blur"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h3 id="book-demo-title" className="text-2xl font-semibold text-foreground">
                  Book a FarmLink walkthrough
                </h3>
                <p className="text-sm text-muted-foreground">
                  Share a few details so we can tailor your demo and align on timelines.
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={closeDialog}
                aria-label="Close demo request form"
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6">
              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 text-center">
                  <CheckCircle2 className="h-12 w-12 text-accent" aria-hidden="true" />
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-foreground">Thanks for reaching out!</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team will be in touch shortly to personalise your FarmLink walkthrough and align on dates.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      className="rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
                      onClick={closeDialog}
                      type="button"
                    >
                      Close
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-primary/40 text-primary hover:bg-primary/10"
                      onClick={() => {
                        setStatus("idle");
                        setFormState(initialState);
                        setError(null);
                      }}
                      type="button"
                    >
                      Send another request
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="grid gap-4 rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg shadow-primary/10 backdrop-blur"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col text-left text-sm font-medium text-primary">
                      Full name
                      <input
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                        className="mt-2 rounded-full border border-primary/20 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="Jane Doe"
                      />
                    </label>
                    <label className="flex flex-col text-left text-sm font-medium text-primary">
                      Work email
                      <input
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        className="mt-2 rounded-full border border-primary/20 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="jane@cooperative.com"
                      />
                    </label>
                    <label className="flex flex-col text-left text-sm font-medium text-primary">
                      Organisation
                      <input
                        name="organization"
                        type="text"
                        value={formState.organization}
                        onChange={handleChange}
                        autoComplete="organization"
                        className="mt-2 rounded-full border border-primary/20 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="Sunrise Coffee Cooperative"
                      />
                    </label>
                    <label className="flex flex-col text-left text-sm font-medium text-primary">
                      Phone / WhatsApp
                      <input
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        className="mt-2 rounded-full border border-primary/20 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="+251 900 000000"
                      />
                    </label>
                  </div>
                  <label className="flex flex-col text-left text-sm font-medium text-primary">
                    Preferred demo date (optional)
                    <input
                      name="preferredDate"
                      type="date"
                      value={formState.preferredDate}
                      onChange={handleChange}
                      className="mt-2 rounded-full border border-primary/20 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </label>
                  <label className="flex flex-col text-left text-sm font-medium text-primary">
                    What should we focus on?
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      className="mt-2 rounded-3xl border border-primary/20 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Tell us about your current systems, challenges, and timeline."
                    />
                  </label>
                  {error ? (
                    <p className="rounded-full border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  ) : null}
                  <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Button
                      type="submit"
                      size="lg"
                      className="rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Sending..." : "Submit request"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="rounded-full text-sm text-muted-foreground hover:text-foreground"
                      onClick={closeDialog}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </BookDemoDialogContext.Provider>
  );
}
