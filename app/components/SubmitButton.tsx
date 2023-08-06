import { useIsSubmitting } from "remix-validated-form";
import React from "react";

export const SubmitButton = () => {
    const isSubmitting = useIsSubmitting();
    return (
        <button className="btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"} <i className="icon-turn-down-left"></i>
        </button>
    );
};