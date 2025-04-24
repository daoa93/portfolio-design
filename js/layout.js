// header 삽입 후 햄버거 이벤트 및 active 메뉴 강조 처리
fetch("/components/header.html")
  .then(res => res.text())
  .then(data => {
    document.body.insertAdjacentHTML("afterbegin", data);

    const toggleBtn = document.querySelector('.btnToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = navMenu?.querySelectorAll('a') || [];
    // ✅ 1. URL 기준으로 현재 메뉴만 active로 설정
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
      const href = link.getAttribute('href');

      // 모든 링크에서 active 제거
      link.classList.remove('active');

      // 현재 URL에 포함되면 active 부여
      if (href && currentPath.includes(href)) {
        link.classList.add('active');
      }
    });

    // ✅ 2. 메뉴 클릭 시 active 클래스 옮기기
    navMenu?.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
      }
    });

    // ✅ 3. 햄버거 메뉴 토글 + 외부 클릭 시 닫기
    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener('click', (e) => {
        navMenu.classList.toggle('show');
        toggleBtn.classList.toggle('active');
        e.stopPropagation();
      });

      document.addEventListener('click', (e) => {
        if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('show');
          toggleBtn.classList.remove('active');
        }
      });
    }
  });

// footer 삽입
fetch("/components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.body.insertAdjacentHTML("beforeend", data);
  });
