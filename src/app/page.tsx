"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Section, Block, Link } from "@/devlink/_Builtin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import os from "os";

export default function Home() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
    console.log("OS Debug Info:", {
      platform: os.platform(),
      arch: os.arch(),
      hostname: os.hostname(),
      release: os.release(),
    });
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">reloading...</div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }

  return (
    <Section
      tag="section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Block tag="div" className="container">
        <Block
          tag="div"
          className="hero-split"
          style={{
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <h1
            className="margin-bottom-24px"
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
            }}
          >
            {`Welcome to Webflow Cloud, ${session.user?.name}`}
          </h1>
          <Block tag="p" className="margin-bottom-24px">
            This is a simple test using Basic components with enhanced styling.
          </Block>
          <div>
            <Link
              button={true}
              options={{
                href: "#",
              }}
              onClick={async () => {
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                });
              }}
              data-action="sign-out"
              className="button-primary"
            >
              Log out
            </Link>
            {/* <Link
              button={true}
              onClick={async () => {
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                });
              }}
              data-action="sign-out"
              className="button-primary"
            >
              Log out
            </Link> */}
          </div>
        </Block>
      </Block>
    </Section>
  );
}
