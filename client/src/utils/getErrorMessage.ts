import axios from "axios";

export function getErrorMessage(err: unknown, fallback: string): string {
    if (axios.isAxiosError(err) && err.response?.data?.error) {
        return err.response.data.error;
    }
    return fallback;
}
