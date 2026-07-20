"use client";

import { Crown, Medal, Radio, RefreshCw, Sparkles, Trophy, Users } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { EmptyState, PageSkeleton } from "@/components/ui/PageState";
import { OnlineUsersBadge } from "@/components/ui/OnlineUsersBadge";

export default function LeaderboardPage() {
  const {
    leaderboard,
    leaderboardLoading,
    currentUserId,
    refreshLeaderboard,
    socketConnected,
    currentUser,
    language,
    openAuth,
  } = useApp();
  const ka = language === "ka";
  const podiumLabels = ka ? ["პირველი ადგილი", "მეორე ადგილი", "მესამე ადგილი"] : ["First place", "Second place", "Third place"];
  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="page-wrap section-pad leaderboard-page">
      <div className="container">
        <div className="page-heading split-heading">
          <div>
            <div className="eyebrow"><Trophy size={15} /> Live standings</div>
            <h1>{ka ? "ლიდერბორდი" : "Leaderboard"}</h1>
            <p>{ka ? "ყოველი გაგზავნილი პასუხი რეიტინგს ავტომატურად აახლებს." : "Every submitted answer updates the ranking automatically."}</p>
          </div>
          <div className="leaderboard-status">
            <OnlineUsersBadge />
            <span className={socketConnected ? "socket-status connected" : "socket-status"}>
              <Radio size={14} /> {socketConnected ? ka ? "Live განახლება ჩართულია" : "Live updates active" : currentUser ? ka ? "კავშირის აღდგენა..." : "Connecting..." : ka ? "Live-სთვის შედი" : "Sign in for live updates"}
            </span>
            {!currentUser && <button className="button tiny secondary" onClick={() => openAuth("sign-in")}>{ka ? "შესვლა" : "Sign in"}</button>}
          </div>
        </div>

        {leaderboardLoading ? <PageSkeleton cards={3} /> : leaderboard.length === 0 ? (
          <EmptyState title={ka ? "ლიდერბორდი ჯერ ცარიელია" : "The leaderboard is empty"} description={ka ? "პირველი სწორი პასუხი აქ პირველ მოთამაშეს გამოაჩენს." : "The first correct answer will place the first player here."} />
        ) : (
          <>
            <div className="podium-grid">
              {topThree.map((entry, index) => (
                <article className={`podium-card rank-${entry.rank} ${entry.userId === currentUserId ? "current" : ""}`} key={entry.userId}>
                  <div className="podium-rank">{entry.rank === 1 ? <Crown /> : <Medal />}</div>
                  <div className="podium-avatar">{entry.name.charAt(0).toUpperCase()}</div>
                  <span>{podiumLabels[index]}</span>
                  <h2>{entry.name}</h2>
                  <strong>{entry.score.toLocaleString()} <small>{ka ? "ქულა" : "points"}</small></strong>
                  {entry.userId === currentUserId && <b className="you-pill">{ka ? "შენ" : "You"}</b>}
                </article>
              ))}
            </div>

            <section className="leaderboard-panel glass-panel">
              <div className="panel-heading">
                <div><Sparkles size={18} /><div><h2>{ka ? "სრული რეიტინგი" : "Full ranking"}</h2><p>{ka ? "გლობალური ქულა • live განახლება" : "Global score • live updates"}</p></div></div>
                <button className="icon-text-button" onClick={() => void refreshLeaderboard()}><RefreshCw size={15} /> {ka ? "განახლება" : "Refresh"}</button>
              </div>
              <div className="table-scroll">
                <table className="leaderboard-table">
                  <thead><tr><th>{ka ? "რანგი" : "Rank"}</th><th>{ka ? "მოთამაშე" : "Player"}</th><th>{ka ? "ფორმატი" : "Format"}</th><th>{ka ? "სტატუსი" : "Status"}</th><th>{ka ? "ქულა" : "Score"}</th></tr></thead>
                  <tbody>
                    {leaderboard.map((entry) => (
                      <tr key={entry.userId} className={entry.userId === currentUserId ? "current-row" : ""}>
                        <td><span className={`rank-badge rank-${entry.rank}`}>{entry.rank <= 3 ? <Medal size={15} /> : "#"}{entry.rank}</span></td>
                        <td><div className="table-user"><span>{entry.name.charAt(0).toUpperCase()}</span><div><strong>{entry.name}</strong><small>{entry.userId === currentUserId ? ka ? "შენი ანგარიში" : "Your account" : "Quibly player"}</small></div>{entry.userId === currentUserId && <b>{ka ? "შენ" : "You"}</b>}</div></td>
                        <td><span className="table-muted"><Users size={14} /> {ka ? "ყველა ქვიზი" : "All quizzes"}</span></td>
                        <td><span className="live-status"><i /> Live score</span></td>
                        <td className="score-cell">{entry.score.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
