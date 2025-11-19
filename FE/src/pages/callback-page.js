import React, { useEffect } from "react";
import { NavBar } from "../components/navigation/desktop/nav-bar";
import { MobileNavBar } from "../components/navigation/mobile/mobile-nav-bar";
import { PageLayout } from "../components/page-layout";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

export const CallbackPage = () => {
    const { isLoading, isAuthenticated, error } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (error) {
        return (
            <PageLayout>
                <NavBar />
                <MobileNavBar />
                <div className="content-layout">
                    <h1 id="page-title" className="content__title">Authentication error</h1>
                    <div className="content__body">
                        <p id="page-description">We couldn’t complete the sign-in process.</p>
                        <p className="content__hint"><code>{error.message}</code></p>
                        <button
                            className="button button__primary"
                            onClick={() => navigate("/", { replace: true })}
                        >
                            Back to home
                        </button>
                    </div>
                </div>
            </PageLayout>
        );
    }

    if (isLoading || !isAuthenticated) {
        return (
            <PageLayout>
                <NavBar />
                <MobileNavBar />
                <div className="content-layout">
                    <h1 id="page-title" className="content__title">Signing you in…</h1>
                    <div className="content__body">
                        <p id="page-description">Please wait while we complete the sign-in process.</p>
                        <div className="spinner" aria-label="Loading" />
                    </div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <NavBar />
            <MobileNavBar />
            <div className="content-layout">
                <h1 id="page-title" className="content__title">Signed in</h1>
                <div className="content__body">
                    <p>You are now signed in. Redirecting…</p>
                </div>
            </div>
        </PageLayout>
    );
};
