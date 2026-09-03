/* ==========================================================
   감상 기록 (Listening Log) — 정적 사이트용 localStorage 엔진
   의존성 0. log.html 및 '관람함' 버튼이 있는 페이지에서 <script src="log.js" defer> 로 로드.
   ========================================================== */
(function () {
  "use strict";

  var KEY = "classical-log-v1";
  // 시드 버전. 올릴 때마다 기존 브라우저에도 1회 '병합'이 실행된다(사용자 기록은 보존).
  var SEEDED = "classical-log-seeded-v5";

  var TYPE_LABEL = {
    orchestra: "관현악", opera: "오페라", ballet: "발레",
    recital: "독주/독창", chamber: "실내악", other: "기타"
  };

  // 사용자 실제 예매 내역 (예술의전당) — 최초 1회만 주입. 관람 지난 공연은 attended.
  var SEED = [
    // ── 관람 예정 ──
    { date:"2026-08-12", time:"19:30", venue:"예술의전당 콘서트홀", type:"orchestra",
      work:"베토벤 교향곡 9번 '합창'", slug:"beethoven-symphony-no9-op125",
      composer:"Beethoven", performer:"서울시향 · 얍 판 츠베덴 (유럽투어 프리뷰)", rating:0,
      note:"함께 연주: 존 애덤스 '부상 처치사(The Wound-Dresser)' · 독창 최지은/이아경/손지훈/마티아스 괴르네 · 합창 국립합창단", status:"attended" },
    { date:"2026-08-20", time:"19:30", venue:"예술의전당 오페라극장", type:"ballet",
      work:"백조의 호수", slug:"stage-tchaikovsky-swan-lake",
      composer:"Tchaikovsky", performer:"예술의전당 & 유니버설발레단", rating:0, note:"", status:"attended" },
    { date:"2026-09-04", time:"19:30", venue:"예술의전당 콘서트홀", type:"recital",
      work:"조수미 콘서트 CONTINUUM (데뷔 40주년 기념)", slug:"sumi-jo-continuum-2026",
      composer:"", performer:"소프라노 조수미", rating:0, note:"세계무대 데뷔 40주년 기념 리사이틀", status:"planned" },
    { date:"2026-10-29", time:"19:30", venue:"예술의전당 오페라극장", type:"opera",
      work:"라인의 황금 (니벨룽의 반지 서야)", slug:"stage-wagner-das-rheingold",
      composer:"Wagner", performer:"국립오페라단 정기공연", rating:0, note:"", status:"planned" },
    { date:"2026-11-14", time:"17:00", venue:"예술의전당 콘서트홀", type:"opera",
      work:"베르디 콘서트 오페라 (리골레토·아이다·라 트라비아타)", slug:"verdi-opera-gala-2026",
      composer:"Verdi", performer:"밀레니엄필하모닉 · 최영선 지휘 · 임세경/김순영/양준모 외", rating:0,
      note:"콘서트 오페라 갈라 — 세 오페라 하이라이트 아리아 (스크린 무대)", status:"planned" },
    { date:"2026-12-03", time:"17:00", venue:"예술의전당 오페라극장", type:"opera",
      work:"돈 카를로스", slug:"stage-verdi-don-carlos",
      composer:"Verdi", performer:"국립오페라단 정기공연", rating:0, note:"", status:"planned" },
    { date:"2026-09-12", time:"17:00", venue:"예술의전당 콘서트홀", type:"opera",
      work:"2026 예술의전당 회원음악회 — 비제 《카르멘》 하이라이트", slug:"sac-members-concert-2026",
      composer:"Bizet", performer:"데이비드 이 지휘 · 경기필 · 백재은/박성규/김종표/홍주영", rating:0, note:"오페라 카르멘 1~4막 하이라이트(콘서트 오페라)", status:"planned" },
    { date:"2026-09-16", time:"19:30", venue:"예술의전당 콘서트홀", type:"orchestra",
      work:"프랑스 메스 그랑테스트 국립 오케스트라 내한", slug:"metz-grand-est-2026",
      composer:"", performer:"다비트 라일란트 지휘 · 피아노 신창용", rating:0, note:"한·불 수교 140주년 · 드뷔시 목신/바다 · 라흐마니노프 3번 · 라벨 라 발스", status:"planned" },
    { date:"2026-10-03", time:"17:00", venue:"예술의전당 오페라극장", type:"ballet",
      work:"잠자는 숲속의 미녀", slug:"stage-tchaikovsky-sleeping-beauty",
      composer:"Tchaikovsky", performer:"유니버설발레단", rating:0, note:"", status:"planned" },
    { date:"2026-10-18", time:"17:00", venue:"예술의전당 콘서트홀", type:"recital",
      work:"손열음 피아노 리사이틀", slug:"son-yeoleum-recital-2026",
      composer:"", performer:"피아노 손열음", rating:0, note:"전설적 피아니스트들이 작곡·편곡한 소품 모음 프로그램", status:"planned" },
    { date:"2026-12-17", time:"19:30", venue:"예술의전당 콘서트홀", type:"orchestra",
      work:"서울시향 얍 판 츠베덴의 '환희의 송가' (베토벤 9번)", slug:"spo-ode-to-joy-2026",
      composer:"Beethoven", performer:"서울시향 · 얍 판 츠베덴 · 홍혜란/양송미/김성호/심기환", rating:0, note:"연말 제9 · 슈만 4대 호른 콘체르트슈튀크 Op.86 포함", status:"planned" },
    // ── 지난 관람 ──
    { date:"2026-08-27", time:"20:00", venue:"예술의전당 콘서트홀", type:"orchestra",
      work:"KBS교향악단 제829회 '순수한 사랑'", slug:"kbso-829-2026",
      composer:"", performer:"정명훈 지휘 · 피아노 김세현", rating:0, note:"라흐마니노프 피협 2번 · 프로코피예프 로미오와 줄리엣 모음곡", status:"attended" },
    { date:"2026-07-23", time:"19:30", venue:"예술의전당 오페라극장", type:"opera",
      work:"투란도트", slug:"stage-puccini-turandot",
      composer:"Puccini", performer:"예술의전당 오페라", rating:0, note:"", status:"attended" },
    { date:"2026-07-04", time:"17:00", venue:"예술의전당", type:"orchestra",
      work:"베토벤 교향곡 7번", slug:"beethoven-symphony-no7-op92",
      composer:"Beethoven", performer:"국립심포니오케스트라", rating:0,
      note:"함께 연주: 멘델스존 '고요한 바다와 즐거운 항해' Op.27 · 슈만 '미뇽을 위한 레퀴엠' Op.98b", status:"attended" }
  ];

  /* ---------- 저장소 (localStorage 차단 환경 안전) ---------- */
  function safeGet() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch (e) { return []; }
  }
  function safeSet(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); return true; }
    catch (e) { return false; }
  }
  function seedOnce() {
    try {
      if (localStorage.getItem(SEEDED)) return; // 이 시드 버전은 이미 반영됨
      var cur = safeGet();
      var bySlug = {};
      cur.forEach(function (x) { if (x.slug) bySlug[x.slug] = x; });
      var changed = false;
      SEED.forEach(function (s) {
        var existing = s.slug ? bySlug[s.slug] : null;
        if (!existing) {
          // 새 공연(예: 8/12 베토벤 9번)을 다가오는/관람한 목록에 추가
          var n = normalize(s); cur.push(n);
          if (n.slug) bySlug[n.slug] = n; changed = true;
        } else {
          // 기존 항목은 사용자 편집을 덮지 않고 '빈 칸'만 보강
          if (!existing.note && s.note) { existing.note = s.note; changed = true; }
          if (!existing.performer && s.performer) { existing.performer = s.performer; changed = true; }
          if (!existing.time && s.time) { existing.time = s.time; changed = true; }
          if (existing.status === "planned" && s.status === "attended") { existing.status = "attended"; changed = true; }
          // 사용자가 손대지 않은(별점 0·메모 없음) 시드 항목은 실제 예매와 일정 동기화
          //   예) 백조의 호수 8/22(취소) → 8/20 재예매 반영
          var untouched = (Number(existing.rating) || 0) === 0 && !(existing.note || "").trim();
          if (untouched) {
            if (s.date && existing.date !== s.date) { existing.date = s.date; changed = true; }
            if (s.time && existing.time !== s.time) { existing.time = s.time; changed = true; }
            if (s.venue && existing.venue !== s.venue) { existing.venue = s.venue; changed = true; }
          }
        }
      });
      if (changed) safeSet(cur);
      localStorage.setItem(SEEDED, "1");
    } catch (e) { /* 차단 환경: 시드 생략 */ }
  }

  function uid() { return "le_" + Date.now() + "_" + Math.floor(Math.random() * 1e4); }
  function normalize(o) {
    return {
      id: o.id || uid(),
      date: o.date || "", time: o.time || "", venue: o.venue || "",
      type: o.type || "other", work: o.work || "(제목 없음)", slug: o.slug || "",
      composer: o.composer || "", performer: o.performer || "",
      rating: Number(o.rating) || 0, note: o.note || "",
      status: o.status === "attended" ? "attended" : "planned"
    };
  }

  function getAll() { return safeGet().map(normalize); }
  function save(list) { return safeSet(list); }

  function addEntry(entry) {
    var list = getAll();
    if (entry.slug) {
      var dup = list.filter(function (x) { return x.slug && x.slug === entry.slug; })[0];
      if (dup) return { added: false, dup: dup };
    }
    list.push(normalize(entry));
    save(list);
    return { added: true };
  }

  function updateEntry(id, patch) {
    var list = getAll().map(function (x) {
      if (x.id === id) { for (var k in patch) x[k] = patch[k]; }
      return x;
    });
    save(list);
  }
  function removeEntry(id) {
    save(getAll().filter(function (x) { return x.id !== id; }));
  }

  /* ---------- 유틸 ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c];
    });
  }
  function byDate(a, b) { return (a.date || "").localeCompare(b.date || ""); }
  function toast(msg) {
    var t = document.createElement("div");
    t.className = "log-toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add("show"); }, 10);
    setTimeout(function () { t.classList.remove("show"); }, 2200);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 2600);
  }

  /* ---------- '관람함' 버튼 (전 페이지, 이벤트 위임) ---------- */
  function refreshMarkButtons() {
    var slugs = {};
    getAll().forEach(function (x) { if (x.slug) slugs[x.slug] = true; });
    var btns = document.querySelectorAll(".log-mark");
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i], s = b.getAttribute("data-slug");
      if (s && slugs[s]) {
        b.textContent = "♥ 기록됨"; b.classList.add("is-logged"); b.disabled = false;
      } else {
        b.textContent = "♡ 관람함"; b.classList.remove("is-logged");
      }
    }
  }

  document.addEventListener("click", function (ev) {
    var btn = ev.target.closest && ev.target.closest(".log-mark");
    if (!btn) return;
    ev.preventDefault();
    var r = addEntry({
      slug: btn.getAttribute("data-slug") || "",
      work: btn.getAttribute("data-work") || "(제목 없음)",
      type: btn.getAttribute("data-type") || "other",
      composer: btn.getAttribute("data-composer") || "",
      status: "attended",
      date: new Date().toISOString().slice(0, 10)
    });
    if (r.added) { toast("기록에 추가했습니다 → 기록 페이지에서 확인"); }
    else { toast("이미 기록에 있는 작품입니다"); }
    refreshMarkButtons();
    if (document.getElementById("log-attended")) renderLog();
  });

  /* ---------- log.html 렌더 ---------- */
  function ratingStars(entry) {
    var html = '<span class="log-stars" data-id="' + entry.id + '">';
    for (var i = 1; i <= 5; i++) {
      html += '<button class="log-star' + (i <= entry.rating ? " on" : "") +
              '" data-id="' + entry.id + '" data-v="' + i + '" aria-label="' + i + '점">★</button>';
    }
    return html + "</span>";
  }

  function card(entry) {
    var link = entry.slug
      ? ' · <a href="' + linkFor(entry) + '">작품 보기 →</a>'
      : "";
    var meta = [entry.date, entry.time, entry.venue, TYPE_LABEL[entry.type] || "기타"]
      .filter(Boolean).map(esc).join(" · ");
    var perf = entry.performer ? '<span class="log-perf">' + esc(entry.performer) + "</span>" : "";
    return '' +
      '<li class="log-card" data-id="' + entry.id + '">' +
        '<div class="log-meta">' + meta + "</div>" +
        '<h3 class="log-work">' + esc(entry.work) +
          (entry.composer ? ' <small>' + esc(entry.composer) + "</small>" : "") + "</h3>" +
        perf +
        '<div class="log-row">' + ratingStars(entry) +
          '<button class="log-toggle" data-id="' + entry.id + '">' +
            (entry.status === "attended" ? "관람함 ✓" : "예정 → 관람함으로") + "</button>" +
          '<button class="log-del" data-id="' + entry.id + '">삭제</button>' +
        "</div>" +
        '<textarea class="log-note" data-id="' + entry.id +
          '" placeholder="감상 메모...">' + esc(entry.note) + "</textarea>" +
      "</li>";
  }

  // 작품 페이지 추정: stage- → opera.html, 베토벤 7/9번 → concert.html, 그 외 → listen.html
  function linkFor(entry) {
    var concertSlugs = { "beethoven-symphony-no9-op125": 1, "beethoven-symphony-no7-op92": 1, "sumi-jo-continuum-2026": 1, "verdi-opera-gala-2026": 1,
      "metz-grand-est-2026": 1, "spo-ode-to-joy-2026": 1, "son-yeoleum-recital-2026": 1, "sac-members-concert-2026": 1, "kbso-829-2026": 1 };
    var page = entry.slug.indexOf("stage-") === 0 ? "opera.html"
             : (concertSlugs[entry.slug] ? "concert.html" : "listen.html");
    return page + "#" + entry.slug;
  }

  function renderLog() {
    var up = document.getElementById("log-upcoming");
    var at = document.getElementById("log-attended");
    var empty = document.getElementById("log-empty");
    if (!up || !at) return;
    var list = getAll().sort(byDate);
    var planned = list.filter(function (x) { return x.status === "planned"; });
    var attended = list.filter(function (x) { return x.status === "attended"; });

    up.innerHTML = planned.length
      ? '<h2 class="section-title">다가오는 공연 (' + planned.length + ')</h2><ul class="log-list">' +
        planned.map(card).join("") + "</ul>"
      : "";
    at.innerHTML = attended.length
      ? '<h2 class="section-title">관람한 공연 (' + attended.length + ')</h2><ul class="log-list">' +
        attended.map(card).join("") + "</ul>"
      : "";
    if (empty) empty.hidden = (list.length !== 0);
  }

  /* ---------- log.html 폼·버튼 와이어링 ---------- */
  function wireLogPage() {
    var page = document.getElementById("log-attended");
    if (!page) return; // log.html이 아니면 스킵

    // 별점 / 토글 / 삭제 / 메모 (위임)
    document.addEventListener("click", function (ev) {
      var t = ev.target;
      if (t.classList.contains("log-star")) {
        updateEntry(t.getAttribute("data-id"), { rating: Number(t.getAttribute("data-v")) });
        renderLog();
      } else if (t.classList.contains("log-toggle")) {
        var id = t.getAttribute("data-id");
        var cur = getAll().filter(function (x) { return x.id === id; })[0];
        if (cur) { updateEntry(id, { status: cur.status === "attended" ? "planned" : "attended" }); renderLog(); }
      } else if (t.classList.contains("log-del")) {
        if (confirm("이 기록을 삭제할까요?")) { removeEntry(t.getAttribute("data-id")); renderLog(); }
      }
    });
    document.addEventListener("change", function (ev) {
      if (ev.target.classList.contains("log-note")) {
        updateEntry(ev.target.getAttribute("data-id"), { note: ev.target.value });
      }
    });

    // 추가 폼
    var toggle = document.getElementById("log-add-toggle");
    var form = document.getElementById("log-form");
    if (toggle && form) {
      toggle.addEventListener("click", function () { form.hidden = !form.hidden; });
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var fd = new FormData(form);
        addEntry({
          date: fd.get("date") || "", time: fd.get("time") || "",
          venue: fd.get("venue") || "", type: fd.get("type") || "other",
          work: fd.get("work") || "(제목 없음)", composer: fd.get("composer") || "",
          performer: fd.get("performer") || "", note: fd.get("note") || "",
          status: fd.get("status") || "attended"
        });
        form.reset(); form.hidden = true; renderLog();
        toast("기록을 추가했습니다");
      });
    }

    // 내보내기
    var exp = document.getElementById("log-export");
    if (exp) exp.addEventListener("click", function () {
      var blob = new Blob([JSON.stringify(getAll(), null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "classical-log.json";
      document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
    });

    // 가져오기 (병합: 같은 slug 또는 같은 date+work 는 건너뜀)
    var imp = document.getElementById("log-import");
    if (imp) imp.addEventListener("change", function (ev) {
      var file = ev.target.files && ev.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var incoming = JSON.parse(reader.result);
          if (!Array.isArray(incoming)) throw new Error("형식 오류");
          var list = getAll();
          var seen = {};
          list.forEach(function (x) { seen[x.slug || (x.date + "|" + x.work)] = true; });
          var added = 0;
          incoming.forEach(function (o) {
            var k = o.slug || (o.date + "|" + o.work);
            if (!seen[k]) { list.push(normalize(o)); seen[k] = true; added++; }
          });
          save(list); renderLog(); refreshMarkButtons();
          toast(added + "건을 가져왔습니다");
        } catch (e) { toast("가져오기 실패: 올바른 JSON이 아닙니다"); }
        imp.value = "";
      };
      reader.readAsText(file);
    });
  }

  /* ---------- 초기화 ---------- */
  function init() {
    seedOnce();
    refreshMarkButtons();
    renderLog();
    wireLogPage();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
