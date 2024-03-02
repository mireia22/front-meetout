import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useCommonState() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return { error, setError, loading, setLoading, navigate };
}
