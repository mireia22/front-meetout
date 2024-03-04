import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface CommonState {
  error: string;
  loading: boolean;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  navigate: ReturnType<typeof useNavigate>;
}

export function useCommonState(): CommonState {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return { error, setError, loading, setLoading, navigate };
}
