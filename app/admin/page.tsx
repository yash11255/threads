"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Row = { id: string; timestamp: string; form: string; name: string; email: string; phone: string; service: string; message: string; page: string; status: string; notes: string };
const STATUSES = ["New", "Contacted", "Booked", "Closed"];
const PER_PAGE = 25;
type SortKey = "timestamp" | "name" | "form" | "status";

function Hl({ text, q }: { text: string; q: string }) {
  const s = String(text ?? "");
  if (!q) return <>{s}</>;
  const i = s.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return <>{s}</>;
  return <>{s.slice(0, i)}<mark>{s.slice(i, i + q.length)}</mark>{s.slice(i + q.length)}</>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const [sheetUrl, setSheetUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [form, setForm] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState<{ k: SortKey; dir: 1 | -1 }>({ k: "timestamp", dir: -1 });
  const [page, setPage] = useState(0);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const r = await fetch("/api/admin/responses/", { cache: "no-store" });
      if (r.status === 401) return router.replace("/admin/login/");
      const j = await r.json();
      if (!j.ok) throw new Error(j.error);
      setRows(j.rows); setSheetUrl(j.sheetUrl);
    } catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }, [router]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => setPage(0), [q, form, status, from, to]);

  const forms = useMemo(() => [...new Set(rows.map((r) => r.form))].sort(), [rows]);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows
      .filter((r) => !form || r.form === form)
      .filter((r) => !status || r.status === status)
      .filter((r) => !from || r.timestamp >= from)
      .filter((r) => !to || r.timestamp.slice(0, 10) <= to)
      .filter((r) => !needle || [r.name, r.email, r.phone, r.service, r.message, r.form, r.notes, r.id].some((v) => String(v ?? "").toLowerCase().includes(needle)))
      .sort((a, b) => String(a[sort.k]).localeCompare(String(b[sort.k])) * sort.dir);
  }, [rows, q, form, status, from, to, sort]);
  const pageRows = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const today = new Date().toISOString().slice(0, 10);
  const stats = [
    { l: "Total responses", v: rows.length },
    { l: "New (unhandled)", v: rows.filter((r) => r.status === "New").length },
    { l: "Booked", v: rows.filter((r) => r.status === "Booked").length },
    { l: "Today", v: rows.filter((r) => r.timestamp.slice(0, 10) === today).length },
  ];

  async function patch(id: string, data: Partial<Row>) {
    const prev = rows;
    setRows(rows.map((r) => (r.id === id ? { ...r, ...data } : r)));
    const res = await fetch("/api/admin/responses/", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...data }) });
    if (!(await res.json()).ok) { setRows(prev); alert("Update failed"); }
  }
  async function remove(r: Row) {
    if (!confirm(`Delete response from ${r.name}? This also removes the row from the Google Sheet.`)) return;
    const prev = rows;
    setRows(rows.filter((x) => x.id !== r.id));
    const res = await fetch("/api/admin/responses/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: r.id }) });
    if (!(await res.json()).ok) { setRows(prev); alert("Delete failed"); }
  }
  function exportCsv() {
    const cols: (keyof Row)[] = ["id", "timestamp", "form", "name", "email", "phone", "service", "message", "page", "status", "notes"];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...filtered.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `threads-physio-responses-${today}.csv`; a.click();
  }
  async function logout() { await fetch("/api/admin/logout/", { method: "POST" }); router.replace("/admin/login/"); }
  const th = (k: SortKey, label: string) => (
    <th onClick={() => setSort({ k, dir: sort.k === k ? (sort.dir === 1 ? -1 : 1) : 1 })}>
      {label} {sort.k === k ? (sort.dir === 1 ? "▲" : "▼") : ""}
    </th>
  );

  return (
    <>
      <div className="admin-top">
        <div className="container"><h1>Threads Physio · Form Responses</h1><button onClick={logout}>Log out</button></div>
      </div>
      <div className="container">
        <div className="stat-row">{stats.map((s) => <div className="stat" key={s.l}><div className="v">{s.v}</div><div className="l">{s.l}</div></div>)}</div>
        <div className="toolbar">
          <input type="search" placeholder="Search name, email, phone, message, notes…" value={q} onChange={(e) => setQ(e.target.value)} />
          <select value={form} onChange={(e) => setForm(e.target.value)}><option value="">All forms</option>{forms.map((f) => <option key={f}>{f}</option>)}</select>
          <select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All statuses</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} title="From" />
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} title="To" />
          <button className="btn btn-outline" onClick={load}>{loading ? "Loading…" : "Refresh"}</button>
          <button className="btn btn-outline" onClick={exportCsv} disabled={!filtered.length}>Export CSV</button>
          {sheetUrl && <a className="btn" href={sheetUrl} target="_blank" rel="noreferrer">Open Google Sheet</a>}
        </div>
        {error && <div className="form-msg err" style={{ marginBottom: 14 }}>{error}</div>}
        <div className="table-wrap">
          {!loading && !filtered.length ? <div className="empty">{rows.length ? "No responses match your search." : "No responses yet."}</div> : (
            <table>
              <thead><tr>{th("timestamp", "Date")}{th("name", "Name")}<th>Contact</th>{th("form", "Form")}<th>Service</th><th>Message</th>{th("status", "Status")}<th>Notes</th><th></th></tr></thead>
              <tbody>
                {pageRows.map((r) => (
                  <tr key={r.id}>
                    <td style={{ whiteSpace: "nowrap" }}>{new Date(r.timestamp).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td>
                    <td><strong><Hl text={r.name} q={q} /></strong></td>
                    <td><a href={`mailto:${r.email}`}><Hl text={r.email} q={q} /></a><br /><a href={`tel:${r.phone}`}><Hl text={r.phone} q={q} /></a></td>
                    <td><Hl text={r.form} q={q} /></td>
                    <td><Hl text={r.service} q={q} /></td>
                    <td className="msg"><Hl text={r.message} q={q} /></td>
                    <td>
                      <span className={`badge ${r.status}`}>{r.status}</span><br />
                      <select value={r.status} onChange={(e) => patch(r.id, { status: e.target.value })} style={{ marginTop: 6 }}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
                    </td>
                    <td><input defaultValue={r.notes} placeholder="Add note" onBlur={(e) => e.target.value !== r.notes && patch(r.id, { notes: e.target.value })} style={{ padding: "5px 8px", border: "1px solid #ddd", borderRadius: 6, width: 150 }} /></td>
                    <td><button className="icon-btn" onClick={() => remove(r)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="pager">
            <span>{filtered.length} result{filtered.length === 1 ? "" : "s"}</span>
            <span>
              <button disabled={page === 0} onClick={() => setPage(page - 1)}>‹ Prev</button>{" "}
              Page {page + 1} / {pages}{" "}
              <button disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>Next ›</button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
