(() => {
  {
    window.__healthyDessertsBoot = 'started';
    const bootStorageKey = 'healthy-desserts-bootstrap-v2';
    const bootStudentId = '000255928';
    const bootAdminId = 'Admin';
    const bootClassroomPattern = /^[A-Z]\d{3}$/;
    const bootCatalog = [
      { id: 'brownie-keto', name: 'Brownie Keto Energizante', price: 8.5, calories: 180, badge: 'Sin azúcar', emoji: '🍫', tags: ['keto', 'energía', 'concentración'], flavor: 'Cacao puro + nueces', description: 'Ideal para recuperar enfoque sin picos de azúcar.', benefits: ['Energía sostenida', 'Alta saciedad'] },
      { id: 'trufas-matcha', name: 'Trufas de Matcha', price: 12, calories: 140, badge: 'Alto en proteína', emoji: '🍵', tags: ['concentración', 'anti-estrés', 'proteína'], flavor: 'Matcha ceremonial + almendra', description: 'Textura suave y efecto calmante para sesiones largas de estudio.', benefits: ['Enfoque mental', 'Sensorial premium'] },
      { id: 'galletas-avena', name: 'Galletas Avena & Arándanos', price: 9, calories: 210, badge: 'Alto en fibra', emoji: '🫐', tags: ['energía', 'tradicional', 'fibra'], flavor: 'Avena integral + arándanos', description: 'Perfectas para una tarde activa con energía duradera.', benefits: ['Fibra natural', 'Dulzor equilibrado'] },
      { id: 'barras-maca-cacao', name: 'Barras Maca & Cacao', price: 7.5, calories: 165, badge: 'Energía limpia', emoji: '⚡', tags: ['energía', 'sin gluten', 'estudio'], flavor: 'Maca andina + nibs de cacao', description: 'Un snack práctico para rendir sin caer pesado.', benefits: ['Rápidas de llevar', 'Buenas para antes de clases'] },
      { id: 'mousse-chia', name: 'Mousse de Chía y Mango', price: 10, calories: 155, badge: 'Vegano', emoji: '🥭', tags: ['vegano', 'fresco', 'digestivo'], flavor: 'Chía hidratada + mango', description: 'Ligero, fresco y amable para horas largas en campus.', benefits: ['Digestión ligera', 'Opción plant-based'] },
      { id: 'tarta-limon', name: 'Tarta de Limón Proteica', price: 11.5, calories: 190, badge: 'Proteína', emoji: '🍋', tags: ['proteína', 'fresco', 'post-entreno'], flavor: 'Cítricos + yogur alto en proteína', description: 'Equilibrio entre frescura y aporte nutritivo.', benefits: ['Recarga de tarde', 'Sabor vibrante'] },
      { id: 'barritas-cacao', name: 'Barritas Cacao & Nuez', price: 7.5, calories: 172, badge: 'Sin gluten', emoji: '🌰', tags: ['sin gluten', 'keto', 'energía'], flavor: 'Cacao amargo + nueces tostadas', description: 'Crujiente, simple y fácil de sumar al pedido.', benefits: ['Snack de bolsillo', 'Bajo índice glucémico'] },
    ];

    const bootQuestions = [
      { key: 'diet', title: '¿Qué tipo de dieta prefieres?', options: [
        { value: 'vegano', label: 'Vegano', hint: 'Sin ingredientes de origen animal.' },
        { value: 'keto', label: 'Keto', hint: 'Más grasa saludable y menos azúcar.' },
        { value: 'sin gluten', label: 'Sin gluten', hint: 'Para una elección más ligera.' },
        { value: 'tradicional', label: 'Tradicional', hint: 'Sabor clásico y balanceado.' },
      ] },
      { key: 'need', title: '¿Qué necesitas hoy?', options: [
        { value: 'concentracion', label: 'Mejorar concentración', hint: 'Para estudiar con foco.' },
        { value: 'energia', label: 'Energía sostenida', hint: 'Para clases, tareas y biblioteca.' },
        { value: 'antiestres', label: 'Solo un antojo saludable', hint: 'Para bajar el ritmo sin culpa.' },
      ] },
      { key: 'format', title: '¿Qué formato prefieres?', options: [
        { value: 'portable', label: 'Portátil', hint: 'Algo que puedas llevar en la mochila.' },
        { value: 'fresco', label: 'Fresco', hint: 'Ligero para media tarde.' },
        { value: 'intenso', label: 'Intenso', hint: 'Más sabor, más impacto.' },
      ] },
    ];

    const bootElements = {
      authScreen: document.getElementById('authScreen'),
      studentScreen: document.getElementById('studentScreen'),
      adminScreen: document.getElementById('adminScreen'),
      loginForm: document.getElementById('loginForm'),
      loginUser: document.getElementById('loginUser'),
      loginPassword: document.getElementById('loginPassword'),
      logoutStudent: document.getElementById('logoutStudent'),
      logoutAdmin: document.getElementById('logoutAdmin'),
      wizardProgress: document.getElementById('wizardProgress'),
      wizardStepLabel: document.getElementById('wizardStepLabel'),
      questionTitle: document.getElementById('questionTitle'),
      questionOptions: document.getElementById('questionOptions'),
      wizardNextButton: document.getElementById('wizardNextButton'),
      restartQuizButton: document.getElementById('restartQuizButton'),
      matchCard: document.getElementById('matchCard'),
      matchName: document.getElementById('matchName'),
      matchDescription: document.getElementById('matchDescription'),
      matchTags: document.getElementById('matchTags'),
      matchPrice: document.getElementById('matchPrice'),
      matchCalories: document.getElementById('matchCalories'),
      matchVisual: document.getElementById('matchVisual'),
      addMatchToCartButton: document.getElementById('addMatchToCartButton'),
      menuFilters: document.getElementById('menuFilters'),
      menuGrid: document.getElementById('menuGrid'),
      cartList: document.getElementById('cartList'),
      cartBadge: document.getElementById('cartBadge'),
      cartSection: document.getElementById('cartSection'),
      profileSection: document.getElementById('profileSection'),
      backToMenuButton: document.getElementById('backToMenuButton'),
      viewCartShortcut: document.getElementById('viewCartShortcut'),
      orderForm: document.getElementById('orderForm'),
      classroomInput: document.getElementById('classroomInput'),
      subtotalValue: document.getElementById('subtotalValue'),
      totalValue: document.getElementById('totalValue'),
      energyScore: document.getElementById('energyScore'),
      energyBar: document.getElementById('energyBar'),
      recommendationNote: document.getElementById('recommendationNote'),
      studentGreeting: document.getElementById('studentGreeting'),
      profileDays: document.getElementById('profileDays'),
      profileSnacks: document.getElementById('profileSnacks'),
      profileCalories: document.getElementById('profileCalories'),
      savedPreferences: document.getElementById('savedPreferences'),
      openChangePasswordButton: document.getElementById('openChangePasswordButton'),
      passwordModal: document.getElementById('passwordModal'),
      passwordForm: document.getElementById('passwordForm'),
      newPassword: document.getElementById('newPassword'),
      confirmPassword: document.getElementById('confirmPassword'),
      toast: document.getElementById('toast'),
      adminTodayOrders: document.getElementById('adminTodayOrders'),
      adminRevenue: document.getElementById('adminRevenue'),
      adminReady: document.getElementById('adminReady'),
      adminOrders: document.getElementById('adminOrders'),
      adminCatalog: document.getElementById('adminCatalog'),
      studentList: document.getElementById('studentList'),
      resetDemoDataButton: document.getElementById('resetDemoDataButton'),
      bottomNavItems: Array.from(document.querySelectorAll('.bottom-nav__item')),
    };

    const bootState = bootLoadState();
    const bootAnswers = { ...bootState.student.answers };
    let bootActiveUser = null;
    let bootSelectedView = 'home';
    let bootSelectedFilter = bootState.student.selectedFilter || 'todos';

    function bootLoadState() {
      const defaults = {
        users: {
          [bootStudentId]: { id: bootStudentId, password: bootStudentId, role: 'student', firstLogin: true, profile: { daysActive: 12, healthySnacks: 27, avoidedCoffee: 9 } },
          [bootAdminId]: { id: bootAdminId, password: bootAdminId, role: 'admin', firstLogin: false },
        },
        student: {
          answers: { diet: '', need: '', format: '' },
          selectedFilter: 'todos',
          cart: [{ id: 'trufas-matcha', quantity: 1 }],
          profile: { daysActive: 12, healthySnacks: 27, avoidedCoffee: 9 },
        },
        orders: [],
      };

      try {
        const raw = localStorage.getItem(bootStorageKey);
        if (!raw) return defaults;
        const parsed = JSON.parse(raw);
        return {
          ...defaults,
          ...parsed,
          users: { ...defaults.users, ...(parsed.users || {}) },
          student: {
            ...defaults.student,
            ...(parsed.student || {}),
            answers: { ...defaults.student.answers, ...((parsed.student && parsed.student.answers) || {}) },
            profile: { ...defaults.student.profile, ...((parsed.student && parsed.student.profile) || {}) },
            cart: Array.isArray(parsed.student && parsed.student.cart) ? parsed.student.cart : defaults.student.cart,
          },
          orders: Array.isArray(parsed.orders) ? parsed.orders : [],
        };
      } catch {
        return defaults;
      }
    }

    function bootSaveState() {
      localStorage.setItem(bootStorageKey, JSON.stringify(bootState));
    }

    function bootToast(message) {
      bootElements.toast.textContent = message;
      bootElements.toast.classList.add('is-visible');
      clearTimeout(bootToast.timer);
      bootToast.timer = setTimeout(() => bootElements.toast.classList.remove('is-visible'), 2400);
    }

    function bootCurrency(amount) {
      return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(amount);
    }

    function bootProfile() {
      if (!bootState.student.profile) {
        bootState.student.profile = { daysActive: 12, healthySnacks: 27, avoidedCoffee: 9 };
      }
      return bootState.student.profile;
    }

    function bootMatchProduct() {
      const answers = bootAnswers;
      return bootCatalog.map((item) => {
        let score = 0;
        if (answers.diet && item.tags.includes(answers.diet)) score += 3;
        if (answers.need && item.tags.includes(answers.need)) score += 4;
        if (answers.format === 'portable' && item.tags.includes('energía')) score += 1;
        if (answers.format === 'fresco' && item.tags.includes('fresco')) score += 2;
        if (answers.format === 'intenso' && item.tags.includes('proteína')) score += 1;
        return { item, score };
      }).sort((a, b) => b.score - a.score)[0].item;
    }

    function bootSetScreen(mode) {
      bootElements.authScreen.classList.toggle('is-hidden', !!mode);
      bootElements.studentScreen.classList.toggle('is-hidden', mode !== 'student');
      bootElements.adminScreen.classList.toggle('is-hidden', mode !== 'admin');
    }

    function bootRenderAuth() {
      bootSetScreen(null);
    }

    function bootRenderQuestionnaire() {
      const currentIndex = bootQuestions.findIndex((question) => !bootAnswers[question.key]);
      const index = currentIndex === -1 ? bootQuestions.length - 1 : currentIndex;
      const question = bootQuestions[index];
      bootElements.wizardProgress.style.width = `${((index + 1) / bootQuestions.length) * 100}%`;
      bootElements.wizardStepLabel.textContent = `Paso ${index + 1} de ${bootQuestions.length}`;
      bootElements.questionTitle.textContent = question.title;
      bootElements.wizardNextButton.textContent = index === bootQuestions.length - 1 ? 'Descubrir mi postre' : 'Siguiente';
      bootElements.questionOptions.innerHTML = question.options.map((option) => `
        <button class="option-card ${bootAnswers[question.key] === option.value ? 'is-selected' : ''}" type="button" data-question-key="${question.key}" data-question-value="${option.value}">
          <div>
            <strong>${option.label}</strong>
            <small>${option.hint}</small>
          </div>
        </button>
      `).join('');
      bootElements.questionOptions.querySelectorAll('[data-question-key]').forEach((button) => {
        button.addEventListener('click', () => {
          bootAnswers[button.dataset.questionKey] = button.dataset.questionValue;
          bootState.student.answers = { ...bootAnswers };
          bootSaveState();
          bootRenderQuestionnaire();
          bootRenderMatch();
          bootRenderProfile();
        });
      });
    }

    function bootRenderMatch() {
      const match = bootMatchProduct();
      bootElements.matchName.textContent = match.name;
      bootElements.matchDescription.textContent = match.description;
      bootElements.matchPrice.textContent = bootCurrency(match.price);
      bootElements.matchCalories.textContent = `${match.calories} kcal`;
      bootElements.matchTags.innerHTML = match.benefits.map((benefit) => `<span>${benefit}</span>`).join('');
      bootElements.matchVisual.style.background = {
        'brownie-keto': 'linear-gradient(135deg, #f5be65, #7b4a2e)',
        'trufas-matcha': 'linear-gradient(135deg, #c9f0d0, #39b676)',
        'galletas-avena': 'linear-gradient(135deg, #ffd65f, #ef9c3e)',
        'barras-maca-cacao': 'linear-gradient(135deg, #d6b4ff, #7c54f0)',
        'mousse-chia': 'linear-gradient(135deg, #bcead3, #76c68d)',
        'tarta-limon': 'linear-gradient(135deg, #ffe78f, #ffb24d)',
        'barritas-cacao': 'linear-gradient(135deg, #b2d7ff, #3ea2ff)',
      }[match.id] || 'linear-gradient(135deg, #c9f0d0, #7ecb59)';
    }

    function bootRenderMenu() {
      const visibleItems = bootSelectedFilter === 'todos' ? bootCatalog : bootCatalog.filter((item) => item.tags.includes(bootSelectedFilter) || item.id.includes(bootSelectedFilter));
      bootElements.menuFilters.innerHTML = [
        ['todos', 'Todos'], ['concentracion', 'Concentración'], ['energia', 'Energía sostenida'], ['keto', 'Keto'], ['tradicional', 'Tradicional'],
      ].map(([value, label]) => `<button type="button" class="filter-pill ${bootSelectedFilter === value ? 'is-selected' : ''}" data-filter-value="${value}">${label}</button>`).join('');
      bootElements.menuFilters.querySelectorAll('[data-filter-value]').forEach((button) => button.addEventListener('click', () => {
        bootSelectedFilter = button.dataset.filterValue;
        bootState.student.selectedFilter = bootSelectedFilter;
        bootSaveState();
        bootRenderMenu();
      }));
      bootElements.menuGrid.innerHTML = visibleItems.map((item) => `
        <article class="product-card" data-product-id="${item.id}">
          <div class="product-card__visual" data-emoji="${item.emoji}"></div>
          <div class="product-card__body">
            <span class="product-chip">${item.badge}</span>
            <strong>${item.name}</strong>
            <p class="product-meta">${item.flavor}</p>
            <div class="product-price"><span>${bootCurrency(item.price)}</span><button type="button" class="text-button" data-add-product="${item.id}">Añadir</button></div>
          </div>
        </article>
      `).join('');
      bootElements.menuGrid.querySelectorAll('[data-add-product]').forEach((button) => button.addEventListener('click', () => {
        const existing = bootState.student.cart.find((entry) => entry.id === button.dataset.addProduct);
        if (existing) existing.quantity += 1; else bootState.student.cart.push({ id: button.dataset.addProduct, quantity: 1 });
        bootSaveState();
        bootRenderCart();
        bootToast('Producto agregado al carrito.');
      }));
    }

    function bootRenderCart() {
      const items = bootState.student.cart.map((entry) => ({ ...bootCatalog.find((item) => item.id === entry.id), quantity: entry.quantity })).filter((item) => item.id);
      bootElements.cartBadge.textContent = String(items.reduce((sum, item) => sum + item.quantity, 0));
      bootElements.cartList.innerHTML = items.length ? items.map((item) => `
        <article class="cart-item" data-cart-id="${item.id}">
          <div class="cart-item__body">
            <div class="cart-item__header">
              <div class="cart-item__media" aria-hidden="true">${item.emoji}</div>
              <div><strong>${item.name}</strong><p class="muted">${item.flavor}</p></div>
              <button class="remove-button" type="button" data-remove-product="${item.id}">Eliminar</button>
            </div>
            <div class="price-row"><span>${bootCurrency(item.price)}</span><span>${item.calories} kcal</span></div>
            <div class="quantity-control"><button type="button" data-decrease-product="${item.id}">−</button><strong>${item.quantity}</strong><button type="button" data-increase-product="${item.id}">+</button></div>
          </div>
        </article>
      `).join('') : '<article class="cart-item"><div class="cart-item__body"><strong>Tu carrito está vacío</strong><p class="muted">Agrega un producto desde el menú inteligente o desde tu match recomendado.</p></div></article>';
      bootElements.cartList.querySelectorAll('[data-increase-product]').forEach((button) => button.addEventListener('click', () => {
        const item = bootState.student.cart.find((entry) => entry.id === button.dataset.increaseProduct);
        if (item) item.quantity += 1;
        bootSaveState();
        bootRenderCart();
      }));
      bootElements.cartList.querySelectorAll('[data-decrease-product]').forEach((button) => button.addEventListener('click', () => {
        const item = bootState.student.cart.find((entry) => entry.id === button.dataset.decreaseProduct);
        if (!item) return;
        if (item.quantity > 1) item.quantity -= 1; else bootState.student.cart = bootState.student.cart.filter((entry) => entry.id !== item.id);
        bootSaveState();
        bootRenderCart();
      }));
      bootElements.cartList.querySelectorAll('[data-remove-product]').forEach((button) => button.addEventListener('click', () => {
        bootState.student.cart = bootState.student.cart.filter((entry) => entry.id !== button.dataset.removeProduct);
        bootSaveState();
        bootRenderCart();
      }));
      const subtotal = bootState.student.cart.reduce((sum, entry) => {
        const item = bootCatalog.find((product) => product.id === entry.id);
        return sum + (item ? item.price * entry.quantity : 0);
      }, 0);
      bootElements.subtotalValue.textContent = bootCurrency(subtotal);
      bootElements.totalValue.textContent = bootCurrency(subtotal);
    }

    function bootRenderProfile() {
      const profile = bootProfile();
      bootElements.profileDays.textContent = String(profile.daysActive);
      bootElements.profileSnacks.textContent = String(profile.healthySnacks);
      bootElements.profileCalories.textContent = String(profile.avoidedCoffee);
      const pieces = Object.values(bootAnswers).filter(Boolean);
      bootElements.savedPreferences.textContent = pieces.length ? pieces.join(' · ') : 'Sin preferencias guardadas aún.';
      bootElements.studentGreeting.textContent = 'Hola, estudiante';
      const cartCount = bootState.student.cart.reduce((sum, entry) => sum + entry.quantity, 0);
      const energy = Math.min(100, 45 + cartCount * 8 + (bootMatchProduct().tags.includes('energía') ? 8 : 0));
      bootElements.energyScore.textContent = String(energy);
      bootElements.energyBar.style.width = `${energy}%`;
      bootElements.recommendationNote.textContent = cartCount ? `Tienes ${cartCount} snack${cartCount === 1 ? '' : 's'} listo${cartCount === 1 ? '' : 's'} para tu jornada.` : `Mantén el ritmo con ${bootMatchProduct().name} para tu próxima clase.`;
    }

    function bootRenderAdmin() {
      const orders = bootState.orders;
      const revenue = orders.reduce((sum, order) => sum + order.total, 0);
      bootElements.adminTodayOrders.textContent = String(orders.length);
      bootElements.adminRevenue.textContent = bootCurrency(revenue);
      bootElements.adminReady.textContent = String(orders.filter((order) => order.status === 'ready').length);
      bootElements.adminOrders.innerHTML = orders.length ? orders.slice(0, 7).map((order) => `
        <article class="order-card">
          <div class="order-card__body">
            <div class="order-card__header"><div><strong>${order.id}</strong><p class="admin-order__meta">${order.classroom}</p></div><span class="order-status order-status--${order.status}">${({ new: 'Nuevo', cooking: 'En preparación', ready: 'Listo', done: 'Entregado' })[order.status] || 'Nuevo'}</span></div>
            <p class="admin-order__meta">${order.items.map((item) => `${item.quantity}x ${item.name}`).join(' · ')}</p>
            <div class="order-card__footer"><strong>${bootCurrency(order.total)}</strong></div>
          </div>
        </article>
      `).join('') : '<article class="order-card"><div class="order-card__body"><strong>No hay pedidos todavía.</strong><p class="muted">Cuando un estudiante confirme un pedido aparecerá aquí.</p></div></article>';
      bootElements.adminCatalog.innerHTML = bootCatalog.slice(0, 4).map((item) => `
        <article class="catalog-card"><div class="catalog-card__visual" data-emoji="${item.emoji}"></div><div class="catalog-card__body"><div class="catalog-card__header"><div><strong>${item.name}</strong><p class="admin-catalog__meta">${item.flavor}</p></div><span class="admin-chip">${item.badge}</span></div><div class="price-row"><span>${item.calories} kcal</span><strong>${bootCurrency(item.price)}</strong></div></div></article>
      `).join('');
      bootElements.studentList.innerHTML = `
        <article class="student-item"><div class="student-item__body"><div class="student-item__header"><strong>Alumno ${bootStudentId}</strong><span class="admin-chip">${bootState.users[bootStudentId].firstLogin ? 'Clave inicial activa' : 'Cuenta configurada'}</span></div><p class="student-item__meta">Preferencias actuales: ${Object.values(bootAnswers).filter(Boolean).join(' · ') || 'Sin preferencias guardadas aún.'}</p></div></article>
        <article class="student-item"><div class="student-item__body"><strong>Pedidos con entrega de aula</strong><p class="student-item__meta">Formato validado: G503, C201, K607.</p></div></article>
      `;
    }

    function bootScrollTo(el) {
      if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function bootShowView(view) {
      bootSelectedView = view;
      bootElements.cartSection.classList.toggle('is-hidden', view !== 'cart');
      bootElements.profileSection.classList.toggle('is-hidden', view !== 'profile');
      bootElements.matchCard.classList.toggle('is-hidden', view === 'profile');
      bootElements.bottomNavItems.forEach((item) => item.classList.toggle('is-active', item.dataset.view === view));
      if (view === 'menu') bootScrollTo(bootElements.menuGrid);
      if (view === 'cart') bootScrollTo(bootElements.cartSection);
      if (view === 'profile') bootScrollTo(bootElements.profileSection);
    }

    function bootOpenPasswordModal() {
      bootElements.passwordModal.classList.remove('is-hidden');
      bootElements.newPassword.value = '';
      bootElements.confirmPassword.value = '';
      bootElements.newPassword.focus();
    }

    function bootClosePasswordModal() {
      bootElements.passwordModal.classList.add('is-hidden');
    }

    function bootLogin(event) {
      event.preventDefault();
      const userId = bootElements.loginUser.value.trim();
      const password = bootElements.loginPassword.value;
      const user = bootState.users[userId];
      if (!user || user.password !== password) { bootToast('Credenciales inválidas.'); return; }
      bootActiveUser = userId;
      if (user.role === 'student' && user.firstLogin && password === bootStudentId) { bootOpenPasswordModal(); bootToast('Primer acceso detectado. Crea tu nueva contraseña.'); return; }
      if (user.role === 'student') { bootSetScreen('student'); bootRenderQuestionnaire(); bootRenderMatch(); bootRenderMenu(); bootRenderCart(); bootRenderProfile(); bootShowView('home'); bootToast('Sesión iniciada como alumno.'); return; }
      bootSetScreen('admin'); bootRenderAdmin(); bootToast('Sesión iniciada como administrador.');
    }

    function bootSavePassword(event) {
      event.preventDefault();
      const nextPassword = bootElements.newPassword.value.trim();
      const confirm = bootElements.confirmPassword.value.trim();
      if (nextPassword.length < 8) { bootToast('La nueva contraseña debe tener al menos 8 caracteres.'); return; }
      if (nextPassword !== confirm) { bootToast('Las contraseñas no coinciden.'); return; }
      const user = bootState.users[bootStudentId];
      user.password = nextPassword;
      user.firstLogin = false;
      bootSaveState();
      bootClosePasswordModal();
      bootSetScreen('student');
      bootRenderQuestionnaire();
      bootRenderMatch();
      bootRenderMenu();
      bootRenderCart();
      bootRenderProfile();
      bootShowView('home');
      bootToast('Contraseña actualizada correctamente.');
    }

    function bootHandleOrder(event) {
      event.preventDefault();
      const classroom = bootElements.classroomInput.value.trim().toUpperCase();
      if (!bootClassroomPattern.test(classroom)) { bootToast('Ingresa un aula válida en formato como G503, C201 o K607.'); bootElements.classroomInput.focus(); return; }
      if (!bootState.student.cart.length) { bootToast('Tu carrito está vacío. Agrega al menos un producto.'); return; }
      const items = bootState.student.cart.map((entry) => {
        const item = bootCatalog.find((product) => product.id === entry.id);
        return { id: item.id, name: item.name, price: item.price, emoji: item.emoji, quantity: entry.quantity };
      });
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      bootState.orders.unshift({ id: `HD-${Date.now().toString(36).toUpperCase()}`, userId: bootActiveUser, classroom, status: 'new', createdAt: new Date().toISOString(), items, total: Number(total.toFixed(2)) });
      bootState.student.cart = [];
      bootProfile().daysActive += 1;
      bootProfile().healthySnacks += 1;
      bootSaveState();
      bootRenderCart();
      bootRenderAdmin();
      bootRenderProfile();
      bootElements.orderForm.reset();
      bootToast(`Pedido confirmado para ${classroom}.`);
      bootShowView('home');
    }

    function bootResetDemo() {
      localStorage.removeItem(bootStorageKey);
      location.reload();
    }

    bootElements.loginForm.addEventListener('submit', bootLogin);
    bootElements.passwordForm.addEventListener('submit', bootSavePassword);
    bootElements.logoutStudent.addEventListener('click', () => bootRenderAuth());
    bootElements.logoutAdmin.addEventListener('click', () => bootRenderAuth());
    bootElements.restartQuizButton.addEventListener('click', () => { bootState.student.answers = { diet: '', need: '', format: '' }; bootSaveState(); bootRenderQuestionnaire(); bootRenderMatch(); bootRenderProfile(); bootToast('Flujo reiniciado.'); });
    bootElements.wizardNextButton.addEventListener('click', () => {
      const nextQuestion = bootQuestions.find((question) => !bootAnswers[question.key]);
      if (nextQuestion) { bootToast('Selecciona una opción para continuar.'); return; }
      bootToast(`Tu match es ${bootMatchProduct().name}.`);
      bootScrollTo(bootElements.matchCard);
    });
    bootElements.addMatchToCartButton.addEventListener('click', () => { const match = bootMatchProduct(); const existing = bootState.student.cart.find((entry) => entry.id === match.id); if (existing) existing.quantity += 1; else bootState.student.cart.push({ id: match.id, quantity: 1 }); bootSaveState(); bootRenderCart(); bootToast(`${match.name} añadido al carrito.`); bootShowView('cart'); });
    bootElements.viewCartShortcut.addEventListener('click', () => bootShowView('cart'));
    bootElements.backToMenuButton.addEventListener('click', () => bootShowView('menu'));
    bootElements.menuFilters.addEventListener('click', (event) => { const target = event.target.closest('[data-filter-value]'); if (!target) return; bootSelectedFilter = target.dataset.filterValue; bootState.student.selectedFilter = bootSelectedFilter; bootSaveState(); bootRenderMenu(); });
    bootElements.orderForm.addEventListener('submit', bootHandleOrder);
    bootElements.openChangePasswordButton.addEventListener('click', bootOpenPasswordModal);
    bootElements.passwordModal.addEventListener('click', (event) => { if (event.target === bootElements.passwordModal) bootClosePasswordModal(); });
    bootElements.resetDemoDataButton.addEventListener('click', bootResetDemo);
    bootElements.bottomNavItems.forEach((item) => item.addEventListener('click', () => bootShowView(item.dataset.view)));

    bootElements.passwordForm.addEventListener('submit', bootSavePassword);
    bootElements.cartList.addEventListener('click', (event) => {
      const increase = event.target.closest('[data-increase-product]');
      const decrease = event.target.closest('[data-decrease-product]');
      const remove = event.target.closest('[data-remove-product]');
      const targetId = increase?.dataset.increaseProduct || decrease?.dataset.decreaseProduct || remove?.dataset.removeProduct;
      if (!targetId) return;
      const entry = bootState.student.cart.find((item) => item.id === targetId);
      if (increase && entry) entry.quantity += 1;
      if (decrease && entry) { if (entry.quantity > 1) entry.quantity -= 1; else bootState.student.cart = bootState.student.cart.filter((item) => item.id !== targetId); }
      if (remove) bootState.student.cart = bootState.student.cart.filter((item) => item.id !== targetId);
      bootSaveState();
      bootRenderCart();
    });

    bootRenderAuth();
    bootRenderQuestionnaire();
    bootRenderMatch();
    bootRenderMenu();
    bootRenderCart();
    bootRenderProfile();
    bootRenderAdmin();
    window.__healthyDessertsBoot = 'ready';
    return;
  }
  const STORAGE_KEY = 'healthy-desserts-state-v1';
  const DEFAULT_PASSWORD = '000255928';
  const ADMIN_ID = 'Admin';
  const ADMIN_PASSWORD = 'Admin';
  const classroomPattern = /^[A-Z]\d{3}$/;

  const catalog = [
    {
      id: 'brownie-keto',
      name: 'Brownie Keto Energizante',
      price: 8.5,
      calories: 180,
      badge: 'Sin azúcar',
      emoji: '🍫',
      category: 'keto',
      tags: ['keto', 'energía', 'concentración'],
      flavor: 'Cacao puro + nueces',
      description: 'Ideal para recuperar enfoque sin picos de azúcar.',
      benefits: ['Energía sostenida', 'Alta saciedad'],
      score: { keto: 4, energia: 4, concentracion: 3, antiestres: 1, tradicional: 1 },
    },
    {
      id: 'trufas-matcha',
      name: 'Trufas de Matcha',
      price: 12,
      calories: 140,
      badge: 'Alto en proteína',
      emoji: '🍵',
      category: 'concentration',
      tags: ['concentración', 'anti-estrés', 'proteína'],
      flavor: 'Matcha ceremonial + almendra',
      description: 'Textura suave y efecto calmante para sesiones largas de estudio.',
      benefits: ['Enfoque mental', 'Sensorial premium'],
      score: { keto: 2, energia: 2, concentracion: 5, antiestres: 4, tradicional: 1 },
    },
    {
      id: 'galletas-avena',
      name: 'Galletas Avena & Arándanos',
      price: 9,
      calories: 210,
      badge: 'Alto en fibra',
      emoji: '🫐',
      category: 'energy',
      tags: ['energía', 'tradicional', 'fibra'],
      flavor: 'Avena integral + arándanos',
      description: 'Perfectas para una tarde activa con energía duradera.',
      benefits: ['Fibra natural', 'Dulzor equilibrado'],
      score: { keto: 1, energia: 5, concentracion: 2, antiestres: 2, tradicional: 4 },
    },
    {
      id: 'barras-maca-cacao',
      name: 'Barras Maca & Cacao',
      price: 7.5,
      calories: 165,
      badge: 'Energía limpia',
      emoji: '⚡',
      category: 'energy',
      tags: ['energía', 'sin gluten', 'estudio'],
      flavor: 'Maca andina + nibs de cacao',
      description: 'Un snack práctico para rendir sin caer pesado.',
      benefits: ['Rápidas de llevar', 'Buenas para antes de clases'],
      score: { keto: 3, energia: 5, concentracion: 3, antiestres: 1, tradicional: 2 },
    },
    {
      id: 'mousse-chia',
      name: 'Mousse de Chía y Mango',
      price: 10,
      calories: 155,
      badge: 'Vegano',
      emoji: '🥭',
      category: 'traditional',
      tags: ['vegano', 'fresco', 'digestivo'],
      flavor: 'Chía hidratada + mango',
      description: 'Ligero, fresco y amable para horas largas en campus.',
      benefits: ['Digestión ligera', 'Opción plant-based'],
      score: { keto: 2, energia: 3, concentracion: 2, antiestres: 4, tradicional: 3 },
    },
    {
      id: 'tarta-limon',
      name: 'Tarta de Limón Proteica',
      price: 11.5,
      calories: 190,
      badge: 'Proteína',
      emoji: '🍋',
      category: 'concentration',
      tags: ['proteína', 'fresco', 'post-entreno'],
      flavor: 'Cítricos + yogur alto en proteína',
      description: 'Equilibrio entre frescura y aporte nutritivo.',
      benefits: ['Recarga de tarde', 'Sabor vibrante'],
      score: { keto: 1, energia: 3, concentracion: 4, antiestres: 3, tradicional: 4 },
    },
    {
      id: 'barritas-cacao',
      name: 'Barritas Cacao & Nuez',
      price: 7.5,
      calories: 172,
      badge: 'Sin gluten',
      emoji: '🌰',
      category: 'keto',
      tags: ['sin gluten', 'keto', 'energía'],
      flavor: 'Cacao amargo + nueces tostadas',
      description: 'Crujiente, simple y fácil de sumar al pedido.',
      benefits: ['Snack de bolsillo', 'Bajo índice glucémico'],
      score: { keto: 4, energia: 4, concentracion: 2, antiestres: 1, tradicional: 1 },
    },
  ];

  const questionFlow = [
    {
      title: '¿Qué tipo de dieta prefieres?',
      key: 'diet',
      options: [
        { value: 'vegano', label: 'Vegano', hint: 'Sin ingredientes de origen animal.' },
        { value: 'keto', label: 'Keto', hint: 'Más grasa saludable y menos azúcar.' },
        { value: 'sin gluten', label: 'Sin gluten', hint: 'Para una elección más ligera.' },
        { value: 'tradicional', label: 'Tradicional', hint: 'Sabor clásico y balanceado.' },
      ],
    },
    {
      title: '¿Qué necesitas hoy?',
      key: 'need',
      options: [
        { value: 'concentracion', label: 'Mejorar concentración', hint: 'Para estudiar con foco.' },
        { value: 'energia', label: 'Energía sostenida', hint: 'Para clases, tareas y biblioteca.' },
        { value: 'antiestres', label: 'Solo un antojo saludable', hint: 'Para bajar el ritmo sin culpa.' },
      ],
    },
    {
      title: '¿Qué formato prefieres?',
      key: 'format',
      options: [
        { value: 'portable', label: 'Portátil', hint: 'Algo que puedas llevar en la mochila.' },
        { value: 'fresco', label: 'Fresco', hint: 'Ligero para media tarde.' },
        { value: 'intenso', label: 'Intenso', hint: 'Más sabor, más impacto.' },
      ],
    },
  ];

  const appState = loadState();
  const elements = mapElements();
  let activeUserId = null;
  let pendingPasswordChange = false;
  let passwordChangeResolve = null;
  let currentView = 'home';
  let selectedFilter = 'todos';
  let selectedQuestionAnswers = appState.student.answers || { diet: '', need: '', format: '' };

  init();

  function init() {
    hydrateCurrentSession();
    bindEvents();
    renderQuestionnaire();
    renderCatalogFilterPills();
    renderMenu();
    renderCart();
    renderAdmin();
    updateDerivedState();
    renderInitialScreen();
    syncStudentProfile();
  }

  function mapElements() {
    return {
      authScreen: document.getElementById('authScreen'),
      studentScreen: document.getElementById('studentScreen'),
      adminScreen: document.getElementById('adminScreen'),
      loginForm: document.getElementById('loginForm'),
      loginUser: document.getElementById('loginUser'),
      loginPassword: document.getElementById('loginPassword'),
      logoutStudent: document.getElementById('logoutStudent'),
      logoutAdmin: document.getElementById('logoutAdmin'),
      wizardProgress: document.getElementById('wizardProgress'),
      wizardStepLabel: document.getElementById('wizardStepLabel'),
      questionTitle: document.getElementById('questionTitle'),
      questionOptions: document.getElementById('questionOptions'),
      wizardNextButton: document.getElementById('wizardNextButton'),
      restartQuizButton: document.getElementById('restartQuizButton'),
      matchCard: document.getElementById('matchCard'),
      matchName: document.getElementById('matchName'),
      matchDescription: document.getElementById('matchDescription'),
      matchTags: document.getElementById('matchTags'),
      matchPrice: document.getElementById('matchPrice'),
      matchCalories: document.getElementById('matchCalories'),
      matchVisual: document.getElementById('matchVisual'),
      addMatchToCartButton: document.getElementById('addMatchToCartButton'),
      menuFilters: document.getElementById('menuFilters'),
      menuGrid: document.getElementById('menuGrid'),
      cartList: document.getElementById('cartList'),
      cartBadge: document.getElementById('cartBadge'),
      cartSection: document.getElementById('cartSection'),
      profileSection: document.getElementById('profileSection'),
      backToMenuButton: document.getElementById('backToMenuButton'),
      viewCartShortcut: document.getElementById('viewCartShortcut'),
      orderForm: document.getElementById('orderForm'),
      classroomInput: document.getElementById('classroomInput'),
      subtotalValue: document.getElementById('subtotalValue'),
      totalValue: document.getElementById('totalValue'),
      energyScore: document.getElementById('energyScore'),
      energyBar: document.getElementById('energyBar'),
      recommendationNote: document.getElementById('recommendationNote'),
      studentGreeting: document.getElementById('studentGreeting'),
      profileDays: document.getElementById('profileDays'),
      profileSnacks: document.getElementById('profileSnacks'),
      profileCalories: document.getElementById('profileCalories'),
      savedPreferences: document.getElementById('savedPreferences'),
      openChangePasswordButton: document.getElementById('openChangePasswordButton'),
      passwordModal: document.getElementById('passwordModal'),
      passwordForm: document.getElementById('passwordForm'),
      newPassword: document.getElementById('newPassword'),
      confirmPassword: document.getElementById('confirmPassword'),
      toast: document.getElementById('toast'),
      adminTodayOrders: document.getElementById('adminTodayOrders'),
      adminRevenue: document.getElementById('adminRevenue'),
      adminReady: document.getElementById('adminReady'),
      adminOrders: document.getElementById('adminOrders'),
      adminCatalog: document.getElementById('adminCatalog'),
      studentList: document.getElementById('studentList'),
      resetDemoDataButton: document.getElementById('resetDemoDataButton'),
      bottomNavItems: Array.from(document.querySelectorAll('.bottom-nav__item')),
    };
  }

  function bindEvents() {
    elements.loginForm.addEventListener('submit', handleLogin);
    elements.logoutStudent.addEventListener('click', logout);
    elements.logoutAdmin.addEventListener('click', logout);
    elements.restartQuizButton.addEventListener('click', resetQuiz);
    elements.wizardNextButton.addEventListener('click', advanceWizard);
    elements.addMatchToCartButton.addEventListener('click', addRecommendedItemToCart);
    elements.viewCartShortcut.addEventListener('click', () => showStudentView('cart'));
    elements.backToMenuButton.addEventListener('click', () => showStudentView('menu'));
    elements.orderForm.addEventListener('submit', handleOrderSubmit);
    elements.openChangePasswordButton.addEventListener('click', openPasswordModal);
    elements.passwordForm.addEventListener('submit', handlePasswordChangeSubmit);
    elements.resetDemoDataButton.addEventListener('click', resetDemoData);

    elements.bottomNavItems.forEach((item) => {
      item.addEventListener('click', () => showStudentView(item.dataset.view));
    });

    elements.menuFilters.addEventListener('click', handleFilterClick);
    elements.menuGrid.addEventListener('click', handleMenuGridAction);
    elements.cartList.addEventListener('click', handleCartAction);
    elements.passwordModal.addEventListener('click', (event) => {
      if (event.target === elements.passwordModal) closePasswordModal();
    });
    document.addEventListener('keydown', handleEscape);
  }

  function hydrateCurrentSession() {
    if (!appState.student.cart.length) {
      appState.student.cart = [
        { id: 'trufas-matcha', quantity: 1 },
      ];
    }

    if (!appState.orders.length) {
      appState.orders = [
        createDemoOrder('000255928', 'G503', 'Pabellón E', 'Yape', 'new', 'trufas-matcha', 1),
        createDemoOrder('000255928', 'C201', 'Biblioteca', 'Tarjeta', 'cooking', 'brownie-keto', 2),
        createDemoOrder('000255928', 'K607', 'Pabellón E', 'Plin', 'ready', 'galletas-avena', 1),
      ];
    }

    if (!appState.student.profile) {
      appState.student.profile = {
        daysActive: 12,
        healthySnacks: 27,
        avoidedCoffee: 9,
      };
    }

    appState.student.answers = selectedQuestionAnswers;
    persistState();
  }

  function createDemoOrder(userId, classroom, deliveryPoint, paymentMethod, status, productId, quantity) {
    const product = catalog.find((item) => item.id === productId) || catalog[0];
    const orderId = `HD-${Math.floor(Math.random() * 9000 + 1000)}`;
    return {
      id: orderId,
      userId,
      classroom,
      status,
      createdAt: new Date().toISOString(),
      items: [{ id: product.id, name: product.name, price: product.price, emoji: product.emoji, quantity }],
      total: Number((product.price * quantity).toFixed(2)),
    };
  }

  function loadState() {
    const baseState = {
      users: {
        [DEFAULT_PASSWORD]: {
          id: DEFAULT_PASSWORD,
          password: DEFAULT_PASSWORD,
          role: 'student',
          firstLogin: true,
          profile: {
            daysActive: 12,
            healthySnacks: 27,
            avoidedCoffee: 9,
          },
        },
        [ADMIN_ID]: {
          id: ADMIN_ID,
          password: ADMIN_PASSWORD,
          role: 'admin',
          firstLogin: false,
        },
      },
      student: {
        answers: {
          diet: '',
          need: '',
          format: '',
        },
        selectedFilter: 'todos',
        cart: [],
        deliveryPoint: 'Pabellón E',
        paymentMethod: 'Yape',
        profile: {
          daysActive: 12,
          healthySnacks: 27,
          avoidedCoffee: 9,
        },
      },
      orders: [],
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return baseState;
      const parsed = JSON.parse(raw);
      return {
        ...baseState,
        ...parsed,
        users: {
          ...baseState.users,
          ...(parsed.users || {}),
        },
        student: {
          ...baseState.student,
          ...(parsed.student || {}),
          answers: {
            ...baseState.student.answers,
            ...((parsed.student && parsed.student.answers) || {}),
          },
          profile: {
            ...baseState.student.profile,
            ...((parsed.student && parsed.student.profile) || {}),
          },
        },
        orders: Array.isArray(parsed.orders) ? parsed.orders : [],
      };
    } catch {
      return baseState;
    }
  }

  function persistState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }

  function handleLogin(event) {
    event.preventDefault();
    const userId = elements.loginUser.value.trim();
    const password = elements.loginPassword.value;
    const user = appState.users[userId];

    if (!user || user.password !== password) {
      showToast('Credenciales inválidas. Verifica el ID y la contraseña.');
      return;
    }

    activeUserId = userId;
    if (user.role === 'student') {
      if (user.firstLogin && password === DEFAULT_PASSWORD) {
        pendingPasswordChange = true;
        openPasswordModal();
        showToast('Primer acceso detectado. Crea tu nueva contraseña.');
        return;
      }
      enterStudentMode(userId);
      showToast('Sesión iniciada como alumno.');
      return;
    }

    enterAdminMode(userId);
    showToast('Sesión iniciada como administrador.');
  }

  function enterStudentMode(userId) {
    activeUserId = userId;
    pendingPasswordChange = false;
    renderInitialScreen('student');
    syncStudentProfile();
    showStudentView('home');
    elements.loginForm.reset();
    renderQuestionnaire();
    renderMenu();
    renderCart();
    updateDerivedState();
  }

  function enterAdminMode(userId) {
    activeUserId = userId;
    pendingPasswordChange = false;
    renderInitialScreen('admin');
    renderAdmin();
    elements.loginForm.reset();
  }

  function renderInitialScreen(mode) {
    elements.authScreen.classList.toggle('is-hidden', !!mode);
    elements.studentScreen.classList.toggle('is-hidden', mode !== 'student');
    elements.adminScreen.classList.toggle('is-hidden', mode !== 'admin');
    if (!mode) {
      elements.authScreen.classList.remove('is-hidden');
      elements.studentScreen.classList.add('is-hidden');
      elements.adminScreen.classList.add('is-hidden');
    }
  }

  function handleEscape(event) {
    if (event.key === 'Escape' && !elements.passwordModal.classList.contains('is-hidden')) {
      if (!pendingPasswordChange) closePasswordModal();
    }
  }

  function openPasswordModal() {
    elements.passwordModal.classList.remove('is-hidden');
    elements.newPassword.value = '';
    elements.confirmPassword.value = '';
    elements.newPassword.focus();
  }

  function closePasswordModal() {
    elements.passwordModal.classList.add('is-hidden');
    if (pendingPasswordChange) {
      pendingPasswordChange = false;
    }
    if (passwordChangeResolve) {
      passwordChangeResolve(false);
      passwordChangeResolve = null;
    }
  }

  function handlePasswordChangeSubmit(event) {
    event.preventDefault();
    const newPassword = elements.newPassword.value.trim();
    const confirmPassword = elements.confirmPassword.value.trim();

    if (newPassword.length < 8) {
      showToast('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('Las contraseñas no coinciden.');
      return;
    }

    if (!activeUserId || !appState.users[activeUserId]) {
      showToast('No se encontró la sesión activa.');
      return;
    }

    appState.users[activeUserId].password = newPassword;
    appState.users[activeUserId].firstLogin = false;
    persistState();
    closePasswordModal();
    enterStudentMode(activeUserId);
    showToast('Contraseña actualizada correctamente.');
  }

  function logout() {
    activeUserId = null;
    pendingPasswordChange = false;
    elements.loginForm.reset();
    renderInitialScreen();
    showToast('Sesión cerrada.');
  }

  function renderQuestionnaire() {
    const total = questionFlow.length;
    const currentIndex = getQuestionIndex();
    const currentQuestion = questionFlow[currentIndex];

    elements.wizardProgress.style.width = `${((currentIndex + 1) / total) * 100}%`;
    elements.wizardStepLabel.textContent = `Paso ${currentIndex + 1} de ${total}`;
    elements.questionTitle.textContent = currentQuestion.title;
    elements.wizardNextButton.textContent = currentIndex === total - 1 ? 'Descubrir mi postre' : 'Siguiente';
    elements.questionOptions.innerHTML = currentQuestion.options
      .map((option) => {
        const checked = selectedQuestionAnswers[currentQuestion.key] === option.value ? 'checked' : '';
        const selectedClass = checked ? 'is-selected' : '';
        return `
          <label class="option-card ${selectedClass}">
            <input type="radio" name="${currentQuestion.key}" value="${option.value}" ${checked} />
            <div>
              <strong>${option.label}</strong>
              <small>${option.hint}</small>
            </div>
          </label>
        `;
      })
      .join('');

    elements.questionOptions.querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', () => {
        selectedQuestionAnswers[currentQuestion.key] = input.value;
        persistStudentPreferences();
        renderQuestionnaire();
        renderMatch();
        syncStudentProfile();
      });
    });

    renderMatch();
  }

  function getQuestionIndex() {
    if (!selectedQuestionAnswers.diet) return 0;
    if (!selectedQuestionAnswers.need) return 1;
    if (!selectedQuestionAnswers.format) return 2;
    return 2;
  }

  function advanceWizard() {
    const currentIndex = getQuestionIndex();
    const currentQuestion = questionFlow[currentIndex];
    const selectedOption = selectedQuestionAnswers[currentQuestion.key];

    if (!selectedOption) {
      showToast('Selecciona una opción para continuar.');
      return;
    }

    if (currentIndex < questionFlow.length - 1) {
      renderQuestionnaireByIndex(currentIndex + 1);
      return;
    }

    const product = getRecommendedProduct();
    showToast(`Tu match es ${product.name}.`);
    renderMatch();
    scrollIntoView(elements.matchCard);
  }

  function renderQuestionnaireByIndex(index) {
    const question = questionFlow[index];
    const total = questionFlow.length;
    elements.wizardProgress.style.width = `${((index + 1) / total) * 100}%`;
    elements.wizardStepLabel.textContent = `Paso ${index + 1} de ${total}`;
    elements.questionTitle.textContent = question.title;
    elements.wizardNextButton.textContent = index === total - 1 ? 'Descubrir mi postre' : 'Siguiente';
    elements.questionOptions.innerHTML = question.options
      .map((option) => {
        const checked = selectedQuestionAnswers[question.key] === option.value ? 'checked' : '';
        return `
          <label class="option-card ${checked ? 'is-selected' : ''}">
            <input type="radio" name="${question.key}" value="${option.value}" ${checked} />
            <div>
              <strong>${option.label}</strong>
              <small>${option.hint}</small>
            </div>
          </label>
        `;
      })
      .join('');

    elements.questionOptions.querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', () => {
        selectedQuestionAnswers[question.key] = input.value;
        persistStudentPreferences();
        renderQuestionnaireByIndex(index);
        renderMatch();
        syncStudentProfile();
      });
    });

    renderMatch();
  }

  function persistStudentPreferences() {
    appState.student.answers = { ...selectedQuestionAnswers };
    appState.student.selectedFilter = selectedFilter;
    persistState();
  }

  function getRecommendedProduct() {
    const answers = selectedQuestionAnswers;
    const scores = catalog.map((item) => {
      let score = 0;
      score += item.score[answers.diet === 'sin gluten' ? 'tradicional' : answers.diet] || 0;
      score += item.score[answers.need] || 0;
      score += answers.format === 'portable' && item.tags.includes('energía') ? 1 : 0;
      score += answers.format === 'fresco' && item.tags.includes('fresco') ? 2 : 0;
      score += answers.format === 'intenso' && item.tags.includes('proteína') ? 1 : 0;
      if (answers.diet === 'vegano' && item.tags.includes('vegano')) score += 2;
      if (answers.diet === 'keto' && item.tags.includes('keto')) score += 3;
      if (answers.diet === 'sin gluten' && item.tags.includes('sin gluten')) score += 3;
      return { item, score };
    });

    scores.sort((a, b) => b.score - a.score);
    return scores[0].item;
  }

  function renderMatch() {
    const match = getRecommendedProduct();
    elements.matchName.textContent = match.name;
    elements.matchDescription.textContent = match.description;
    elements.matchPrice.textContent = `S/ ${match.price.toFixed(2)}`;
    elements.matchCalories.textContent = `${match.calories} kcal`;
    elements.matchVisual.style.background = getVisualGradient(match.id);
    updateDerivedState();
  }
  function renderSegments() {}

  function renderCatalogFilterPills() {
    const filters = [
      { value: 'todos', label: 'Todos' },
      { value: 'concentration', label: 'Concentración' },
      { value: 'energy', label: 'Energía sostenida' },
      { value: 'keto', label: 'Keto' },
      { value: 'traditional', label: 'Tradicional' },
    ];

    elements.menuFilters.innerHTML = filters
      .map(
        (filter) => `
          <button type="button" class="filter-pill ${selectedFilter === filter.value ? 'is-selected' : ''}" data-filter="${filter.value}">${filter.label}</button>
        `
      )
      .join('');
  }

  function renderMenu() {
    const visibleItems = selectedFilter === 'todos'
      ? catalog
      : catalog.filter((item) => item.category === selectedFilter || item.tags.includes(selectedFilter));

    elements.menuGrid.innerHTML = visibleItems
      .map(
        (item) => `
          <article class="product-card" data-product-id="${item.id}">
            <div class="product-card__visual" data-emoji="${item.emoji}"></div>
            <div class="product-card__body">
              <span class="product-chip">${item.badge}</span>
              <strong>${item.name}</strong>
              <p class="product-meta">${item.flavor}</p>
              <div class="product-price">
                <span>S/ ${item.price.toFixed(2)}</span>
                <button type="button" class="text-button" data-action="add-to-cart" data-product-id="${item.id}">Añadir</button>
              </div>
            </div>
          </article>
        `,
      )
      .join('');
  }

  function handleFilterClick(event) {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    selectedFilter = button.dataset.filter;
    appState.student.selectedFilter = selectedFilter;
    persistState();
    renderCatalogFilterPills();
    renderMenu();
  }

  function handleMenuGridAction(event) {
    const button = event.target.closest('[data-action="add-to-cart"]');
    if (!button) return;
    const productId = button.dataset.productId;
    addToCart(productId, 1);
    renderCart();
    updateDerivedState();
    showToast('Producto agregado al carrito.');
  }

  function addToCart(productId, amount) {
    const existing = appState.student.cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity += amount;
    } else {
      appState.student.cart.push({ id: productId, quantity: amount });
    }
    persistState();
    renderCart();
    updateDerivedState();
  }

  function renderCart() {
    const items = appState.student.cart.map((entry) => {
      const product = catalog.find((item) => item.id === entry.id);
      if (!product) return null;
      return { ...product, quantity: entry.quantity };
    }).filter(Boolean);

    elements.cartBadge.textContent = String(items.reduce((sum, item) => sum + item.quantity, 0));

    if (!items.length) {
      elements.cartList.innerHTML = `
        <article class="cart-item">
          <div class="cart-item__body">
            <strong>Tu carrito está vacío</strong>
            <p class="muted">Agrega un producto desde el menú inteligente o desde tu match recomendado.</p>
          </div>
        </article>
      `;
    } else {
      elements.cartList.innerHTML = items
        .map(
          (item) => `
            <article class="cart-item" data-product-id="${item.id}">
              <div class="cart-item__body">
                <div class="cart-item__header">
                  <div class="cart-item__media" aria-hidden="true">${item.emoji}</div>
                  <div>
                    <strong>${item.name}</strong>
                    <p class="muted">${item.flavor}</p>
                  </div>
                  <button class="remove-button" type="button" data-action="remove-item" data-product-id="${item.id}" aria-label="Eliminar ${item.name}">Eliminar</button>
                </div>
                <div class="price-row">
                  <span>S/ ${item.price.toFixed(2)}</span>
                  <span>${item.calories} kcal</span>
                </div>
                <div class="quantity-control" aria-label="Cantidad de ${item.name}">
                  <button type="button" data-action="decrease" data-product-id="${item.id}">−</button>
                  <strong>${item.quantity}</strong>
                  <button type="button" data-action="increase" data-product-id="${item.id}">+</button>
                </div>
              </div>
            </article>
          `,
        )
        .join('');
    }

    renderOrderSummary();
    updateDerivedState();
  }

  function handleCartAction(event) {
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;
    const productId = actionButton.dataset.productId;
    const action = actionButton.dataset.action;
    const cartItem = appState.student.cart.find((item) => item.id === productId);

    if (action === 'increase') {
      if (cartItem) cartItem.quantity += 1;
    } else if (action === 'decrease') {
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        appState.student.cart = appState.student.cart.filter((item) => item.id !== productId);
      }
    } else if (action === 'remove-item') {
      appState.student.cart = appState.student.cart.filter((item) => item.id !== productId);
    }

    persistState();
    renderCart();
    showToast('Carrito actualizado.');
  }

  function renderOrderSummary() {
    const subtotal = appState.student.cart.reduce((sum, entry) => {
      const product = catalog.find((item) => item.id === entry.id);
      return sum + (product ? product.price * entry.quantity : 0);
    }, 0);
    const total = subtotal;
    elements.subtotalValue.textContent = formatCurrency(subtotal);
    elements.totalValue.textContent = formatCurrency(total);
  }

  function renderSegments() {
    return;
  }

  function handleSegmentClick(event) {
    const button = event.target.closest('.segment-button');
    if (!button) return;
    const { group, value } = button.dataset;

    if (group === 'delivery') {
      appState.student.deliveryPoint = value;
    }
    if (group === 'payment') {
      appState.student.paymentMethod = value;
    }

    persistState();
    renderOrderSummary();
  }

  function handleOrderSubmit(event) {
    event.preventDefault();
    const classroom = elements.classroomInput.value.trim().toUpperCase();

    if (!classroomPattern.test(classroom)) {
      showToast('Ingresa un aula válida en formato como G503, C201 o K607.');
      elements.classroomInput.focus();
      return;
    }

    if (!appState.student.cart.length) {
      showToast('Tu carrito está vacío. Agrega al menos un producto.');
      return;
    }

    const order = buildOrder(classroom);
    appState.orders.unshift(order);
    appState.student.cart = [];
    appState.student.deliveryPoint = 'Pabellón E';
    appState.student.paymentMethod = 'Yape';
    const profile = getStudentProfile();
    profile.healthySnacks += 1;
    profile.daysActive += 1;
    persistState();
    renderCart();
    renderAdmin();
    syncStudentProfile();
    elements.orderForm.reset();
    elements.classroomInput.value = '';
    showToast(`Pedido confirmado para ${classroom}.`);
    showStudentView('home');
  }

  function buildOrder(classroom) {
    const items = appState.student.cart.map((entry) => {
      const product = catalog.find((item) => item.id === entry.id);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
        quantity: entry.quantity,
      };
    });

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      id: `HD-${Date.now().toString(36).toUpperCase()}`,
      userId: activeUserId,
      classroom,
      deliveryPoint: appState.student.deliveryPoint,
      paymentMethod: appState.student.paymentMethod,
      status: 'new',
      createdAt: new Date().toISOString(),
      items,
      total: Number(total.toFixed(2)),
    };
  }

  function renderAdmin() {
    const orders = appState.orders;
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const readyCount = orders.filter((order) => order.status === 'ready').length;

    elements.adminTodayOrders.textContent = String(orders.length);
    elements.adminRevenue.textContent = formatCurrency(revenue);
    elements.adminReady.textContent = String(readyCount);

    elements.adminOrders.innerHTML = orders.length
      ? orders.slice(0, 7).map(renderAdminOrder).join('')
      : '<article class="order-card"><div class="order-card__body"><strong>No hay pedidos todavía.</strong><p class="muted">Cuando un estudiante confirme un pedido aparecerá aquí.</p></div></article>';

    elements.adminCatalog.innerHTML = catalog
      .slice(0, 4)
      .map(
        (item) => `
          <article class="catalog-card">
            <div class="catalog-card__visual" data-emoji="${item.emoji}"></div>
            <div class="catalog-card__body">
              <div class="catalog-card__header">
                <div>
                  <strong>${item.name}</strong>
                  <p class="admin-catalog__meta">${item.flavor}</p>
                </div>
                <span class="admin-chip">${item.badge}</span>
              </div>
              <div class="price-row"><span>${item.calories} kcal</span><strong>S/ ${item.price.toFixed(2)}</strong></div>
            </div>
          </article>
        `,
      )
      .join('');

    const student = appState.users[DEFAULT_PASSWORD];
    elements.studentList.innerHTML = `
      <article class="student-item">
        <div class="student-item__body">
          <div class="student-item__header">
            <strong>Alumno ${student.id}</strong>
            <span class="admin-chip">${student.firstLogin ? 'Clave inicial activa' : 'Cuenta configurada'}</span>
          </div>
          <p class="student-item__meta">Preferencias actuales: ${describePreferences(appState.student.answers)}</p>
        </div>
      </article>
      <article class="student-item">
        <div class="student-item__body">
          <strong>Pedidos con entrega de aula</strong>
          <p class="student-item__meta">Formato validado: G503, C201, K607.</p>
        </div>
      </article>
    `;
  }

  function renderAdminOrder(order) {
    const statusLabel = {
      new: 'Nuevo',
      cooking: 'En preparación',
      ready: 'Listo',
      done: 'Entregado',
    }[order.status] || 'Nuevo';

    return `
      <article class="order-card">
        <div class="order-card__body">
          <div class="order-card__header">
            <div>
              <strong>${order.id}</strong>
              <p class="admin-order__meta">${order.classroom}</p>
            </div>
            <span class="order-status order-status--${order.status}">${statusLabel}</span>
          </div>
          <p class="admin-order__meta">${order.items.map((item) => `${item.quantity}x ${item.name}`).join(' · ')}</p>
          <div class="order-card__footer">
            <strong>${formatCurrency(order.total)}</strong>
            <div class="admin-order__actions">
              <button type="button" data-order-action="next" data-order-id="${order.id}">Avanzar</button>
              <button type="button" data-order-action="done" data-order-id="${order.id}">Entregar</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function describePreferences(answers) {
    const pieces = [];
    if (answers.diet) pieces.push(answers.diet);
    if (answers.need) pieces.push(answers.need);
    if (answers.format) pieces.push(answers.format);
    return pieces.length ? pieces.join(' · ') : 'Sin preferencias guardadas aún.';
  }

  function handleAdminAction(event) {
    const button = event.target.closest('[data-order-action]');
    if (!button) return;
    const orderId = button.dataset.orderId;
    const order = appState.orders.find((item) => item.id === orderId);
    if (!order) return;

    if (button.dataset.orderAction === 'next') {
      const nextStatusMap = { new: 'cooking', cooking: 'ready', ready: 'done', done: 'done' };
      order.status = nextStatusMap[order.status] || 'cooking';
    }

    if (button.dataset.orderAction === 'done') {
      order.status = 'done';
    }

    persistState();
    renderAdmin();
    showToast(`Pedido ${order.id} actualizado.`);
  }

  function showStudentView(view) {
    currentView = view;
    elements.cartSection.classList.toggle('is-hidden', view !== 'cart');
    elements.profileSection.classList.toggle('is-hidden', view !== 'profile');
    elements.matchCard.classList.toggle('is-hidden', view === 'profile');

    elements.bottomNavItems.forEach((item) => {
      item.classList.toggle('is-active', item.dataset.view === view || (view === 'home' && item.dataset.view === 'home'));
    });

    if (view === 'home') {
      scrollIntoView(elements.energyScore);
    }
    if (view === 'menu') {
      scrollIntoView(elements.menuGrid);
    }
    if (view === 'cart') {
      renderCart();
      scrollIntoView(elements.cartSection);
    }
    if (view === 'profile') {
      syncStudentProfile();
      scrollIntoView(elements.profileSection);
    }
  }

  function updateDerivedState() {
    const cartCount = appState.student.cart.reduce((sum, item) => sum + item.quantity, 0);
    const match = getRecommendedProduct();
    const energy = Math.min(100, 45 + cartCount * 8 + (match.tags.includes('energía') ? 8 : 0) + (match.tags.includes('concentración') ? 6 : 0));
    elements.energyScore.textContent = String(energy);
    elements.energyBar.style.width = `${energy}%`;
    elements.recommendationNote.textContent = cartCount
      ? `Tienes ${cartCount} snack${cartCount === 1 ? '' : 's'} listo${cartCount === 1 ? '' : 's'} para tu jornada.`
      : `Mantén el ritmo con ${match.name} para tu próxima clase.`;
    elements.cartBadge.textContent = String(cartCount);
  }

  function syncStudentProfile() {
    const profile = getStudentProfile();
    elements.profileDays.textContent = String(profile.daysActive);
    elements.profileSnacks.textContent = String(profile.healthySnacks);
    elements.profileCalories.textContent = String(profile.avoidedCoffee);
    elements.savedPreferences.textContent = describePreferences(appState.student.answers);
    elements.studentGreeting.textContent = `Hola, ${appState.student.answers.need ? 'vamos a rendir' : 'estudiante'}`;
  }

  function getStudentProfile() {
    if (!appState.student.profile) {
      appState.student.profile = {
        daysActive: 12,
        healthySnacks: 27,
        avoidedCoffee: 9,
      };
    }

    return appState.student.profile;
  }

  function resetQuiz() {
    selectedQuestionAnswers = { diet: '', need: '', format: '' };
    persistStudentPreferences();
    renderQuestionnaire();
    syncStudentProfile();
    showToast('Flujo reiniciado.');
  }

  function renderAdminActionsListener() {
    elements.adminOrders.addEventListener('click', handleAdminAction);
  }

  function resetDemoData() {
    if (!confirm('Esto restablecerá los datos demo del prototipo. ¿Continuar?')) {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }

  function renderOrderSummarySafe() {
    renderOrderSummary();
  }

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      elements.toast.classList.remove('is-visible');
    }, 2400);
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(amount);
  }

  function scrollIntoView(target) {
    if (!target || typeof target.scrollIntoView !== 'function') return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderQuestionnaire() {
    const currentIndex = selectedQuestionAnswers.diet && !selectedQuestionAnswers.need
      ? 1
      : selectedQuestionAnswers.diet && selectedQuestionAnswers.need && !selectedQuestionAnswers.format
        ? 2
        : selectedQuestionAnswers.diet && selectedQuestionAnswers.need && selectedQuestionAnswers.format
          ? 2
          : 0;

    const currentQuestion = questionFlow[currentIndex];
    elements.wizardProgress.style.width = `${((currentIndex + 1) / questionFlow.length) * 100}%`;
    elements.wizardStepLabel.textContent = `Paso ${currentIndex + 1} de ${questionFlow.length}`;
    elements.questionTitle.textContent = currentQuestion.title;
    elements.wizardNextButton.textContent = currentIndex === questionFlow.length - 1 ? 'Descubrir mi postre' : 'Siguiente';

    elements.questionOptions.innerHTML = currentQuestion.options
      .map((option) => `
        <label class="option-card ${selectedQuestionAnswers[currentQuestion.key] === option.value ? 'is-selected' : ''}">
          <input type="radio" name="${currentQuestion.key}" value="${option.value}" ${selectedQuestionAnswers[currentQuestion.key] === option.value ? 'checked' : ''} />
          <div>
            <strong>${option.label}</strong>
            <small>${option.hint}</small>
          </div>
        </label>
      `)
      .join('');

    elements.questionOptions.querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', () => {
        selectedQuestionAnswers[currentQuestion.key] = input.value;
        persistStudentPreferences();
        renderQuestionnaire();
        renderMatch();
        syncStudentProfile();
      });
    });

    renderMatch();
    renderOrderSummary();
    renderAdminActionsListener();
  }

  function showStudentView(view) {
    currentView = view;
    elements.cartSection.classList.toggle('is-hidden', view !== 'cart');
    elements.profileSection.classList.toggle('is-hidden', view !== 'profile');
    elements.matchCard.classList.toggle('is-hidden', view === 'profile');

    elements.bottomNavItems.forEach((item) => {
      item.classList.toggle('is-active', item.dataset.view === view);
    });

    if (view === 'home') scrollIntoView(elements.energyScore);
    if (view === 'menu') scrollIntoView(elements.menuGrid);
    if (view === 'cart') {
      renderCart();
      scrollIntoView(elements.cartSection);
    }
    if (view === 'profile') {
      syncStudentProfile();
      scrollIntoView(elements.profileSection);
    }
  }

  function updateDerivedState() {
    const cartCount = appState.student.cart.reduce((sum, item) => sum + item.quantity, 0);
    const match = getRecommendedProduct();
    const energy = Math.min(100, 45 + cartCount * 8 + (match.tags.includes('energía') ? 8 : 0) + (match.tags.includes('concentración') ? 6 : 0));
    elements.energyScore.textContent = String(energy);
    elements.energyBar.style.width = `${energy}%`;
    elements.recommendationNote.textContent = cartCount
      ? `Tienes ${cartCount} snack${cartCount === 1 ? '' : 's'} listo${cartCount === 1 ? '' : 's'} para tu jornada.`
      : `Mantén el ritmo con ${match.name} para tu próxima clase.`;
    elements.cartBadge.textContent = String(cartCount);
  }

  function renderOrderSummary() {
    const subtotal = appState.student.cart.reduce((sum, entry) => {
      const product = catalog.find((item) => item.id === entry.id);
      return sum + (product ? product.price * entry.quantity : 0);
    }, 0);
    elements.subtotalValue.textContent = formatCurrency(subtotal);
    elements.totalValue.textContent = formatCurrency(subtotal);
    renderSegments();
  }

  function renderSegments() {
    // This function is now empty as per the patch requirements
  }
  
  function enterStudentMode(userId) {
    activeUserId = userId;
    renderInitialScreen('student');
    renderQuestionnaire();
    renderCatalogFilterPills();
    renderMenu();
    renderCart();
    renderSegments();
    updateDerivedState();
    syncStudentProfile();
    showStudentView('home');
    persistState();
  }

  function renderAdminActionsListener() {
    elements.adminOrders.removeEventListener('click', handleAdminAction);
    elements.adminOrders.addEventListener('click', handleAdminAction);
  }

  function renderInitialScreen(mode) {
    elements.authScreen.classList.toggle('is-hidden', !!mode);
    elements.studentScreen.classList.toggle('is-hidden', mode !== 'student');
    elements.adminScreen.classList.toggle('is-hidden', mode !== 'admin');
  }

  function resetDemoData() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }

  function bindEvents() {
    elements.loginForm.addEventListener('submit', handleLogin);
    elements.logoutStudent.addEventListener('click', logout);
    elements.logoutAdmin.addEventListener('click', logout);
    elements.restartQuizButton.addEventListener('click', resetQuiz);
    elements.wizardNextButton.addEventListener('click', advanceWizard);
    elements.addMatchToCartButton.addEventListener('click', addRecommendedItemToCart);
    elements.viewCartShortcut.addEventListener('click', () => showStudentView('cart'));
    elements.backToMenuButton.addEventListener('click', () => showStudentView('menu'));
    elements.orderForm.addEventListener('submit', handleOrderSubmit);
    elements.openChangePasswordButton.addEventListener('click', openPasswordModal);
    elements.passwordForm.addEventListener('submit', handlePasswordChangeSubmit);
    elements.resetDemoDataButton.addEventListener('click', resetDemoData);
    elements.bottomNavItems.forEach((item) => item.addEventListener('click', () => showStudentView(item.dataset.view)));
    elements.menuFilters.addEventListener('click', handleFilterClick);
    elements.menuGrid.addEventListener('click', handleMenuGridAction);
    elements.cartList.addEventListener('click', handleCartAction);
    elements.passwordModal.addEventListener('click', (event) => {
      if (event.target === elements.passwordModal) closePasswordModal();
    });
    document.addEventListener('keydown', handleEscape);
  }

  function renderAdmin() {
    const orders = appState.orders;
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const readyCount = orders.filter((order) => order.status === 'ready').length;

    elements.adminTodayOrders.textContent = String(orders.length);
    elements.adminRevenue.textContent = formatCurrency(revenue);
    elements.adminReady.textContent = String(readyCount);

    elements.adminOrders.innerHTML = orders.length
      ? orders.slice(0, 7).map(renderAdminOrder).join('')
      : '<article class="order-card"><div class="order-card__body"><strong>No hay pedidos todavía.</strong><p class="muted">Cuando un estudiante confirme un pedido aparecerá aquí.</p></div></article>';

    elements.adminCatalog.innerHTML = catalog
      .slice(0, 4)
      .map(
        (item) => `
          <article class="catalog-card">
            <div class="catalog-card__visual" data-emoji="${item.emoji}"></div>
            <div class="catalog-card__body">
              <div class="catalog-card__header">
                <div>
                  <strong>${item.name}</strong>
                  <p class="admin-catalog__meta">${item.flavor}</p>
                </div>
                <span class="admin-chip">${item.badge}</span>
              </div>
              <div class="price-row"><span>${item.calories} kcal</span><strong>S/ ${item.price.toFixed(2)}</strong></div>
            </div>
          </article>
        `,
      )
      .join('');

    const student = appState.users[DEFAULT_PASSWORD];
    elements.studentList.innerHTML = `
      <article class="student-item">
        <div class="student-item__body">
          <div class="student-item__header">
            <strong>Alumno ${student.id}</strong>
            <span class="admin-chip">${student.firstLogin ? 'Clave inicial activa' : 'Cuenta configurada'}</span>
          </div>
          <p class="student-item__meta">Preferencias actuales: ${describePreferences(appState.student.answers)}</p>
        </div>
      </article>
      <article class="student-item">
        <div class="student-item__body">
          <strong>Pedidos con entrega de aula</strong>
          <p class="student-item__meta">Formato validado: G503, C201, K607.</p>
        </div>
      </article>
    `;

    renderAdminActionsListener();
  }

  function renderAdminOrder(order) {
    const statusLabel = {
      new: 'Nuevo',
      cooking: 'En preparación',
      ready: 'Listo',
      done: 'Entregado',
    }[order.status] || 'Nuevo';

    return `
      <article class="order-card" data-order-id="${order.id}">
        <div class="order-card__body">
          <div class="order-card__header">
            <div>
              <strong>${order.id}</strong>
              <p class="admin-order__meta">${order.classroom}</p>
            </div>
            <span class="order-status order-status--${order.status}">${statusLabel}</span>
          </div>
          <p class="admin-order__meta">${order.items.map((item) => `${item.quantity}x ${item.name}`).join(' · ')}</p>
          <div class="order-card__footer">
            <strong>${formatCurrency(order.total)}</strong>
            <div class="admin-order__actions">
              <button type="button" data-order-action="next" data-order-id="${order.id}">Avanzar</button>
              <button type="button" data-order-action="done" data-order-id="${order.id}">Entregar</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function handleAdminAction(event) {
    const button = event.target.closest('[data-order-action]');
    if (!button) return;
    const order = appState.orders.find((item) => item.id === button.dataset.orderId);
    if (!order) return;

    if (button.dataset.orderAction === 'next') {
      order.status = order.status === 'new' ? 'cooking' : order.status === 'cooking' ? 'ready' : 'done';
    }

    if (button.dataset.orderAction === 'done') {
      order.status = 'done';
    }

    persistState();
    renderAdmin();
    showToast(`Pedido ${order.id} actualizado.`);
  }

  function updateDerivedState() {
    const cartCount = appState.student.cart.reduce((sum, item) => sum + item.quantity, 0);
    const match = getRecommendedProduct();
    const energy = Math.min(100, 45 + cartCount * 8 + (match.tags.includes('energía') ? 8 : 0) + (match.tags.includes('concentración') ? 6 : 0));
    elements.energyScore.textContent = String(energy);
    elements.energyBar.style.width = `${energy}%`;
    elements.recommendationNote.textContent = cartCount
      ? `Tienes ${cartCount} snack${cartCount === 1 ? '' : 's'} listo${cartCount === 1 ? '' : 's'} para tu jornada.`
      : `Mantén el ritmo con ${match.name} para tu próxima clase.`;
    elements.cartBadge.textContent = String(cartCount);
  }

  function syncStudentProfile() {
    const student = appState.users[DEFAULT_PASSWORD];
    const profile = student.profile || { daysActive: 12, healthySnacks: 27, avoidedCoffee: 9 };
    elements.profileDays.textContent = String(profile.daysActive);
    elements.profileSnacks.textContent = String(profile.healthySnacks);
    elements.profileCalories.textContent = String(profile.avoidedCoffee);
    elements.savedPreferences.textContent = describePreferences(appState.student.answers);
    elements.studentGreeting.textContent = `Hola, ${appState.student.answers.need ? 'vamos a rendir' : 'estudiante'}`;
  }

  function renderCatalogFilterPills() {
    const filters = [
      { value: 'todos', label: 'Todos' },
      { value: 'concentration', label: 'Concentración' },
      { value: 'energy', label: 'Energía sostenida' },
      { value: 'keto', label: 'Keto' },
      { value: 'traditional', label: 'Tradicional' },
    ];

    elements.menuFilters.innerHTML = filters
      .map(
        (filter) => `
          <button type="button" class="filter-pill ${selectedFilter === filter.value ? 'is-selected' : ''}" data-filter="${filter.value}">${filter.label}</button>
        `,
      )
      .join('');
  }

  function renderMenu() {
    const visibleItems = selectedFilter === 'todos'
      ? catalog
      : catalog.filter((item) => item.category === selectedFilter || item.tags.includes(selectedFilter));

    elements.menuGrid.innerHTML = visibleItems
      .map(
        (item) => `
          <article class="product-card" data-product-id="${item.id}">
            <div class="product-card__visual" data-emoji="${item.emoji}"></div>
            <div class="product-card__body">
              <span class="product-chip">${item.badge}</span>
              <strong>${item.name}</strong>
              <p class="product-meta">${item.flavor}</p>
              <div class="product-price">
                <span>S/ ${item.price.toFixed(2)}</span>
                <button type="button" class="text-button" data-action="add-to-cart" data-product-id="${item.id}">Añadir</button>
              </div>
            </div>
          </article>
        `,
      )
      .join('');
  }

  function getRecommendedProduct() {
    const answers = selectedQuestionAnswers;
    const scores = catalog.map((item) => {
      let score = 0;
      score += item.score[answers.diet] || 0;
      score += item.score[answers.need] || 0;
      if (answers.format === 'portable' && item.tags.includes('energía')) score += 1;
      if (answers.format === 'fresco' && item.tags.includes('fresco')) score += 2;
      if (answers.format === 'intenso' && item.tags.includes('proteína')) score += 1;
      if (answers.diet === 'vegano' && item.tags.includes('vegano')) score += 2;
      if (answers.diet === 'keto' && item.tags.includes('keto')) score += 3;
      if (answers.diet === 'sin gluten' && item.tags.includes('sin gluten')) score += 3;
      return { item, score };
    });

    scores.sort((a, b) => b.score - a.score);
    return scores[0].item;
  }

  function renderMatch() {
    const match = getRecommendedProduct();
    elements.matchName.textContent = match.name;
    elements.matchDescription.textContent = match.description;
    elements.matchPrice.textContent = `S/ ${match.price.toFixed(2)}`;
    elements.matchCalories.textContent = `${match.calories} kcal`;
    elements.matchTags.innerHTML = match.benefits.map((benefit) => `<span>${benefit}</span>`).join('');
    elements.matchVisual.style.background = getVisualGradient(match.id);
    elements.matchVisual.setAttribute('aria-label', `Ilustración del producto ${match.name}`);
  }

  function getVisualGradient(productId) {
    const palettes = {
      'brownie-keto': 'linear-gradient(135deg, #f5be65, #7b4a2e)',
      'trufas-matcha': 'linear-gradient(135deg, #c9f0d0, #39b676)',
      'galletas-avena': 'linear-gradient(135deg, #ffd65f, #ef9c3e)',
      'barras-maca-cacao': 'linear-gradient(135deg, #d6b4ff, #7c54f0)',
      'mousse-chia': 'linear-gradient(135deg, #bcead3, #76c68d)',
      'tarta-limon': 'linear-gradient(135deg, #ffe78f, #ffb24d)',
      'barritas-cacao': 'linear-gradient(135deg, #b2d7ff, #3ea2ff)',
    };
    return palettes[productId] || 'linear-gradient(135deg, #c9f0d0, #7ecb59)';
  }

  function addRecommendedItemToCart() {
    const match = getRecommendedProduct();
    addToCart(match.id, 1);
    showToast(`${match.name} añadido al carrito.`);
    showStudentView('cart');
  }

  function addToCart(productId, amount) {
    const existing = appState.student.cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity += amount;
    } else {
      appState.student.cart.push({ id: productId, quantity: amount });
    }
    persistState();
    renderCart();
  }

  function renderCart() {
    const items = appState.student.cart
      .map((entry) => {
        const product = catalog.find((item) => item.id === entry.id);
        if (!product) return null;
        return { ...product, quantity: entry.quantity };
      })
      .filter(Boolean);

    elements.cartBadge.textContent = String(items.reduce((sum, item) => sum + item.quantity, 0));

    if (!items.length) {
      elements.cartList.innerHTML = `
        <article class="cart-item">
          <div class="cart-item__body">
            <strong>Tu carrito está vacío</strong>
            <p class="muted">Agrega un producto desde el menú inteligente o desde tu match recomendado.</p>
          </div>
        </article>
      `;
    } else {
      elements.cartList.innerHTML = items
        .map(
          (item) => `
            <article class="cart-item" data-product-id="${item.id}">
              <div class="cart-item__body">
                <div class="cart-item__header">
                  <div class="cart-item__media" aria-hidden="true">${item.emoji}</div>
                  <div>
                    <strong>${item.name}</strong>
                    <p class="muted">${item.flavor}</p>
                  </div>
                  <button class="remove-button" type="button" data-action="remove-item" data-product-id="${item.id}" aria-label="Eliminar ${item.name}">Eliminar</button>
                </div>
                <div class="price-row">
                  <span>S/ ${item.price.toFixed(2)}</span>
                  <span>${item.calories} kcal</span>
                </div>
                <div class="quantity-control" aria-label="Cantidad de ${item.name}">
                  <button type="button" data-action="decrease" data-product-id="${item.id}">−</button>
                  <strong>${item.quantity}</strong>
                  <button type="button" data-action="increase" data-product-id="${item.id}">+</button>
                </div>
              </div>
            </article>
          `,
        )
        .join('');
    }

    renderOrderSummary();
    updateDerivedState();
  }

  function handleCartAction(event) {
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;
    const productId = actionButton.dataset.productId;
    const action = actionButton.dataset.action;
    const cartItem = appState.student.cart.find((item) => item.id === productId);

    if (action === 'increase') {
      if (cartItem) cartItem.quantity += 1;
    } else if (action === 'decrease') {
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        appState.student.cart = appState.student.cart.filter((item) => item.id !== productId);
      }
    } else if (action === 'remove-item') {
      appState.student.cart = appState.student.cart.filter((item) => item.id !== productId);
    }

    persistState();
    renderCart();
    showToast('Carrito actualizado.');
  }

  function renderOrderSummary() {
    const subtotal = appState.student.cart.reduce((sum, entry) => {
      const product = catalog.find((item) => item.id === entry.id);
      return sum + (product ? product.price * entry.quantity : 0);
    }, 0);
    elements.subtotalValue.textContent = formatCurrency(subtotal);
    elements.totalValue.textContent = formatCurrency(subtotal);
  }

  function handleSegmentClick() {}

  function handleOrderSubmit(event) {
    event.preventDefault();
    const classroom = elements.classroomInput.value.trim().toUpperCase();

    if (!classroomPattern.test(classroom)) {
      showToast('Ingresa un aula válida en formato como G503, C201 o K607.');
      elements.classroomInput.focus();
      return;
    }

    if (!appState.student.cart.length) {
      showToast('Tu carrito está vacío. Agrega al menos un producto.');
      return;
    }

    const order = buildOrder(classroom);
    appState.orders.unshift(order);
    appState.student.cart = [];
    appState.student.profile.daysActive += 1;
    appState.student.profile.healthySnacks += 1;
    appState.student.profile.avoidedCoffee += 1;
    persistState();
    renderCart();
    renderAdmin();
    syncStudentProfile();
    elements.orderForm.reset();
    showToast(`Pedido confirmado para ${classroom}.`);
    showStudentView('home');
  }

  function buildOrder(classroom) {
    const items = appState.student.cart.map((entry) => {
      const product = catalog.find((item) => item.id === entry.id);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
        quantity: entry.quantity,
      };
    });

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      id: `HD-${Date.now().toString(36).toUpperCase()}`,
      userId: activeUserId,
      classroom,
      status: 'new',
      createdAt: new Date().toISOString(),
      items,
      total: Number(total.toFixed(2)),
    };
  }

  function renderAdminActionsListener() {
    elements.adminOrders.removeEventListener('click', handleAdminAction);
    elements.adminOrders.addEventListener('click', handleAdminAction);
  }

  function resetQuiz() {
    selectedQuestionAnswers = { diet: '', need: '', format: '' };
    persistStudentPreferences();
    renderQuestionnaire();
    syncStudentProfile();
    showToast('Flujo reiniciado.');
  }

  function renderQuestionnaireByIndex(index) {
    const question = questionFlow[index];
    elements.wizardProgress.style.width = `${((index + 1) / questionFlow.length) * 100}%`;
    elements.wizardStepLabel.textContent = `Paso ${index + 1} de ${questionFlow.length}`;
    elements.questionTitle.textContent = question.title;
    elements.wizardNextButton.textContent = index === questionFlow.length - 1 ? 'Descubrir mi postre' : 'Siguiente';
    elements.questionOptions.innerHTML = question.options
      .map(
        (option) => `
          <label class="option-card ${selectedQuestionAnswers[question.key] === option.value ? 'is-selected' : ''}">
            <input type="radio" name="${question.key}" value="${option.value}" ${selectedQuestionAnswers[question.key] === option.value ? 'checked' : ''} />
            <div>
              <strong>${option.label}</strong>
              <small>${option.hint}</small>
            </div>
          </label>
        `,
      )
      .join('');

    elements.questionOptions.querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', () => {
        selectedQuestionAnswers[question.key] = input.value;
        persistStudentPreferences();
        renderQuestionnaireByIndex(index);
        renderMatch();
        syncStudentProfile();
      });
    });

    renderMatch();
  }

  function advanceWizard() {
    const currentIndex = !selectedQuestionAnswers.diet ? 0 : !selectedQuestionAnswers.need ? 1 : !selectedQuestionAnswers.format ? 2 : 2;
    const currentQuestion = questionFlow[currentIndex];

    if (!selectedQuestionAnswers[currentQuestion.key]) {
      showToast('Selecciona una opción para continuar.');
      return;
    }

    if (currentIndex < questionFlow.length - 1) {
      renderQuestionnaireByIndex(currentIndex + 1);
      return;
    }

    showToast(`Tu match es ${getRecommendedProduct().name}.`);
    scrollIntoView(elements.matchCard);
  }

  function renderQuestionnaire() {
    const index = !selectedQuestionAnswers.diet ? 0 : !selectedQuestionAnswers.need ? 1 : !selectedQuestionAnswers.format ? 2 : 2;
    const question = questionFlow[index];
    elements.wizardProgress.style.width = `${((index + 1) / questionFlow.length) * 100}%`;
    elements.wizardStepLabel.textContent = `Paso ${index + 1} de ${questionFlow.length}`;
    elements.questionTitle.textContent = question.title;
    elements.wizardNextButton.textContent = index === questionFlow.length - 1 ? 'Descubrir mi postre' : 'Siguiente';
    elements.questionOptions.innerHTML = question.options
      .map(
        (option) => `
          <label class="option-card ${selectedQuestionAnswers[question.key] === option.value ? 'is-selected' : ''}">
            <input type="radio" name="${question.key}" value="${option.value}" ${selectedQuestionAnswers[question.key] === option.value ? 'checked' : ''} />
            <div>
              <strong>${option.label}</strong>
              <small>${option.hint}</small>
            </div>
          </label>
        `,
      )
      .join('');

    elements.questionOptions.querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', () => {
        selectedQuestionAnswers[question.key] = input.value;
        persistStudentPreferences();
        renderQuestionnaire();
        renderMatch();
        syncStudentProfile();
      });
    });

    renderMatch();
    renderSegments();
    renderOrderSummary();
    renderAdminActionsListener();
  }

  function persistStudentPreferences() {
    appState.student.answers = { ...selectedQuestionAnswers };
    appState.student.selectedFilter = selectedFilter;
    persistState();
  }

  function renderInitialScreen(mode) {
    elements.authScreen.classList.toggle('is-hidden', !!mode);
    elements.studentScreen.classList.toggle('is-hidden', mode !== 'student');
    elements.adminScreen.classList.toggle('is-hidden', mode !== 'admin');
  }

  function logout() {
    activeUserId = null;
    pendingPasswordChange = false;
    elements.loginForm.reset();
    elements.authScreen.classList.remove('is-hidden');
    elements.studentScreen.classList.add('is-hidden');
    elements.adminScreen.classList.add('is-hidden');
    showToast('Sesión cerrada.');
  }
})();
