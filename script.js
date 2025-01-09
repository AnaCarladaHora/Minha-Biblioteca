document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginContainer = document.getElementById('login-form-container');
    const signupContainer = document.getElementById('signup-form-container');
    const libraryContent = document.querySelector('.library-content');
    const addBookFormContainer = document.getElementById('add-book-form-container');
    const addBookButton = document.getElementById('add-book-form-button');
    const cancelAddBookButton = document.getElementById('cancel-add-book');
    const showSignupLink = document.getElementById('show-signup-form');
    const showLoginLink = document.getElementById('show-login-form');
    const bookList = document.getElementById('book-list');
    const addBookForm = document.getElementById('add-book-form');
    const authButtons = document.getElementById('auth-buttons');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const categoryFilter = document.getElementById('category-filter');
    const addGoalFormButton = document.getElementById('add-goal-form-button');
    const addGoalFormContainer = document.getElementById('add-goal-form-container');
    const cancelAddGoalButton = document.getElementById('cancel-add-goal');
    const addGoalForm = document.getElementById('add-goal-form');
    const goalList = document.getElementById('goal-list');
    let editBookId = null;
    let isLoggedIn = false;
    let editGoalId = null;
    const readingGoals2025 = document.getElementById('reading-goals-2025');
    const goals2025Form = document.getElementById('goals-2025-form');
    const closeGoalConfig = document.getElementById('close-goal-config');
    const dailyReadingForm = document.getElementById('daily-reading-form');
    const dailyReadingLog = document.getElementById('daily-reading-log');
    const dashboard = document.getElementById('dashboard');
    const configGoalBtn = document.getElementById('config-goal-btn');
    const totalBooksCount = document.getElementById('total-books-count');
    const booksReadingCount = document.getElementById('books-reading-count');
    const booksReadedCount = document.getElementById('books-readed-count');
    const dailyPagesCount = document.getElementById('daily-pages-count');
    const dailyReadingHistory = document.getElementById('daily-reading-history');
    let editDailyId = null;


    function validateForm(form, errorDiv) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let hasError = false;

        for (const input of inputs) {
            if (!input.value.trim()) {
                hasError = true;
                break;
            }
        }

        if (hasError) {
            const errorMessage = document.createElement('p');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'Por favor, preencha todos os campos.';
            errorDiv.appendChild(errorMessage)
        }

        return !hasError;
    }

    function clearErrors() {
        const loginErrorDiv = document.querySelector('.login-error-message');
        if (loginErrorDiv) {
            loginErrorDiv.remove();
        }
        const signupErrorDiv = document.querySelector('.signup-error-message');
        if (signupErrorDiv) {
            signupErrorDiv.remove();
        }
        const addBookErrorDiv = document.querySelector('#add-book-form-container .error-message');
        if (addBookErrorDiv) {
            addBookErrorDiv.remove();
        }
        const editBookErrorDiv = document.querySelector('.edit-book-form-container .error-message');
        if (editBookErrorDiv) {
            editBookErrorDiv.remove();
        }
        const addGoalErrorDiv = document.querySelector('#add-goal-form-container .error-message');
        if (addGoalErrorDiv) {
            addGoalErrorDiv.remove();
        }
        const editGoalErrorDiv = document.querySelector('.goal-edit-form-container .error-message');
        if (editGoalErrorDiv) {
            editGoalErrorDiv.remove();
        }
         const editDailyReadingErrorDiv = document.querySelector('.edit-daily-form-container .error-message');
        if (editDailyReadingErrorDiv) {
          editDailyReadingErrorDiv.remove();
        }
    }

    // Carrega livros do Local Storage
    function loadBooks(filter = 'all') {
        const books = localStorage.getItem('books')
            ? JSON.parse(localStorage.getItem('books'))
            : [];
        bookList.innerHTML = '';

        const filteredBooks = filter === 'all' ? books : books.filter(book => book.category === filter);
        totalBooksCount.textContent = books.length;
        booksReadingCount.textContent = books.filter(book => book.category === 'lendo').length;
        booksReadedCount.textContent = books.filter(book => book.category === 'lido').length;

        filteredBooks.forEach((book, index) => {
            const bookItem = document.createElement('li');
            let imageElement = book.cover
                ? `<img class="book-cover" src="${book.cover}" alt="Capa do Livro">`
                : '';
            const stars = Array(5).fill(null).map((_, i) => {
                const starClass = i < book.rating ? 'fas fa-star active' : 'fas fa-star';
                return `<i class="${starClass}"></i>`
            }).join('');

            bookItem.innerHTML = `
                ${imageElement}
                <h3>${book.title}</h3>
                <p>Autor: ${book.author}</p>
                <p>Categoria: ${book.category}</p>
                <p>Comentários: ${book.comments}</p>
                <div class="rating-container">${stars}</div>
                <button class="edit-book-button" data-id="${index}" title="Editar">
                  <i class="fas fa-edit"></i>
                </button>
                  <div class="edit-book-form-container"  id="edit-book-form-${index}">
                    <form id="edit-book-form-${index}">
                        <button class="close-edit-button" title="Fechar">
                          <i class="fas fa-times"></i>
                       </button>
                        <div class="form-group">
                              <label for="edit-book-title-${index}">Título:</label>
                            <input type="text" class="form-control" id="edit-book-title-${index}" value="${book.title}" required>
                          </div>
                         <div class="form-group">
                            <label for="edit-book-author-${index}">Autor:</label>
                             <input type="text" class="form-control" id="edit-book-author-${index}" value="${book.author}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-book-cover-${index}">Capa do Livro (URL):</label>
                            <input type="url" class="form-control" id="edit-book-cover-${index}" value="${book.cover}">
                       </div>
                       <div class="form-group">
                         <label for="edit-book-category-${index}">Categoria:</label>
                            <select id="edit-book-category-${index}" class="form-control" required>
                                 <option value="lendo" ${book.category === 'lendo' ? 'selected' : ''}>Lendo</option>
                                <option value="lido" ${book.category === 'lido' ? 'selected' : ''}>Lido</option>
                               <option value="meta" ${book.category === 'meta' ? 'selected' : ''}>Meta de Leitura</option>
                            </select>
                         </div>
                         <div class="form-group">
                          <label for="edit-book-comments-${index}">Comentários:</label>
                            <textarea class="form-control" id="edit-book-comments-${index}" rows="3" >${book.comments}</textarea>
                         </div>
                         <div class="form-group">
                           <label>Avaliação:</label><br>
                            <div class="rating edit-rating">
                              <i class="fas fa-star star" data-value="1"></i>
                                <i class="fas fa-star star" data-value="2"></i>
                              <i class="fas fa-star star" data-value="3"></i>
                              <i class="fas fa-star star" data-value="4"></i>
                              <i class="fas fa-star star" data-value="5"></i>
                                <input type="hidden" id="edit-book-rating-${index}" name="rating" value="${book.rating}">
                          </div>
                          </div>
                          <button type="submit" class="btn btn-success">Salvar</button>
                       <div class="edit-book-error-message error-message"></div>
                  </form>
            </div>
      `;

            bookList.appendChild(bookItem);

            const editRatingContainer = bookItem.querySelector('.edit-rating');
            const editStars = editRatingContainer.querySelectorAll('.star');
            const ratingValue = book.rating;
            editStars.forEach((star, index) => {
                if (index < ratingValue) {
                    star.classList.add('active');
                }
                star.addEventListener('click', function () {
                    const value = parseInt(this.getAttribute('data-value'));
                    const ratingInput = editRatingContainer.querySelector(`input[type="hidden"]`);
                    ratingInput.value = value;
                    editStars.forEach((s, index) => {
                        if (index < value) {
                            s.classList.add('active');
                        } else {
                            s.classList.remove('active');
                        }
                    });
                });
            });
            const editButton = bookItem.querySelector('.edit-book-button');
            const closeButton = bookItem.querySelector('.close-edit-button');
            const editContainer = bookItem.querySelector('.edit-book-form-container');
            editButton.addEventListener('click', () => {
                editBookId = index;
                editContainer.style.display = 'block';
            });
            closeButton.addEventListener('click', (event) => {
                event.preventDefault();
                editContainer.style.display = 'none';
            });
            const editForm = bookItem.querySelector(`#edit-book-form-${index}`);
            if (editForm) {
                editForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    clearErrors();
                    const isValid = validateForm(editForm, editContainer.querySelector('.edit-book-error-message'));
                    if (isValid) {
                        const editedTitle = document.getElementById(`edit-book-title-${index}`).value;
                        const editedAuthor = document.getElementById(`edit-book-author-${index}`).value;
                        const editedCover = document.getElementById(`edit-book-cover-${index}`).value;
                        const editedCategory = document.getElementById(`edit-book-category-${index}`).value;
                        const editedComments = document.getElementById(`edit-book-comments-${index}`).value;
                        const editedRating = document.getElementById(`edit-book-rating-${index}`).value;
                        const books = JSON.parse(localStorage.getItem('books'));

                        books[index] = {
                            title: editedTitle,
                            author: editedAuthor,
                            cover: editedCover,
                            category: editedCategory,
                            comments: editedComments,
                            rating: editedRating
                        }
                        localStorage.setItem('books', JSON.stringify(books));
                        loadBooks(categoryFilter.value);
                        editContainer.style.display = 'none';
                    }
                });
            }
        });
    }

    function loadGoals() {
        const goals = localStorage.getItem('goals')
            ? JSON.parse(localStorage.getItem('goals'))
            : [];

        if (goalList) {
            goalList.innerHTML = '';
            goals.forEach((goal, index) => {
                const goalItem = document.createElement('li');
                goalItem.innerHTML = `
             <h3>${goal.title}</h3>
            <p>Descrição: ${goal.description}</p>
             <p>Data de Conclusão: ${goal.targetDate}</p>
               <p>Status: ${goal.status}</p>
                   <button class="goal-edit-button" data-id="${index}" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
               <div class="goal-edit-form-container"  id="goal-edit-form-${index}">
                   <form id="goal-edit-form-${index}">
                        <div class="form-group">
                            <label for="edit-goal-title-${index}">Título da Meta:</label>
                             <input type="text" class="form-control" id="edit-goal-title-${index}" value="${goal.title}" required>
                         </div>
                         <div class="form-group">
                            <label for="edit-goal-description-${index}">Descrição da Meta:</label>
                            <textarea class="form-control" id="edit-goal-description-${index}" rows="3">${goal.description}</textarea>
                        </div>
                        <div class="form-group">
                          <label for="edit-goal-target-date-${index}">Data de Conclusão:</label>
                             <input type="date" class="form-control" id="edit-goal-target-date-${index}" value="${goal.targetDate}" required>
                        </div>
                        <div class="form-group">
                           <label for="edit-goal-status-${index}">Status:</label>
                           <select id="edit-goal-status-${index}" class="form-control" required>
                              <option value="pendente" ${goal.status === 'pendente' ? 'selected' : ''}>Pendente</option>
                              <option value="em-andamento" ${goal.status === 'em-andamento' ? 'selected' : ''}>Em Andamento</option>
                              <option value="concluida" ${goal.status === 'concluida' ? 'selected' : ''}>Concluída</option>
                          </select>
                    </div>
                    <button type="submit" class="btn btn-success">Salvar</button>
                   <div class="goal-edit-error-message error-message"></div>
                  </form>
             </div>
           `;
                goalList.appendChild(goalItem);

                const editButton = goalItem.querySelector('.goal-edit-button');
                const editContainer = goalItem.querySelector('.goal-edit-form-container');
                editButton.addEventListener('click', () => {
                    editGoalId = index;
                    editContainer.style.display = 'block';
                });
                const editForm = goalItem.querySelector(`#goal-edit-form-${index}`);
                if (editForm) {
                    editForm.addEventListener('submit', (event) => {
                        event.preventDefault();
                        clearErrors();
                        const isValid = validateForm(editForm, editContainer.querySelector('.goal-edit-error-message'));
                        if (isValid) {
                            const editedTitle = document.getElementById(`edit-goal-title-${index}`).value;
                            const editedDescription = document.getElementById(`edit-goal-description-${index}`).value;
                            const editedTargetDate = document.getElementById(`edit-goal-target-date-${index}`).value;
                            const editedStatus = document.getElementById(`edit-goal-status-${index}`).value;
                            const goals = JSON.parse(localStorage.getItem('goals'));
                            goals[index] = {
                                title: editedTitle,
                                description: editedDescription,
                                targetDate: editedTargetDate,
                                status: editedStatus
                            }
                            localStorage.setItem('goals', JSON.stringify(goals));
                            loadGoals();
                            editContainer.style.display = 'none';
                        }
                    });
                }
            });
        }
    }
    function loadDailyReadings() {
        const dailyReadings = localStorage.getItem('dailyReadings')
            ? JSON.parse(localStorage.getItem('dailyReadings'))
            : [];
        dailyReadingLog.innerHTML = '';
        let totalPages = 0;
        dailyReadings.forEach((reading, index) => {
             totalPages += parseInt(reading.pages);
            const readingItem = document.createElement('p');
          readingItem.innerHTML = `${reading.date}: ${reading.pages} páginas
              <button class="edit-daily-button" data-id="${index}" title="Editar">
                  <i class="fas fa-edit"></i>
                </button>
                 <div class="edit-daily-form-container"  id="edit-daily-form-${index}">
                    <form id="edit-daily-form-${index}">
                         <button class="close-daily-edit-button" title="Fechar">
                          <i class="fas fa-times"></i>
                         </button>
                       <div class="form-group">
                             <label for="edit-daily-pages-${index}">Páginas Lidas:</label>
                            <input type="number" class="form-control" id="edit-daily-pages-${index}" value="${reading.pages}" required>
                        </div>
                     <button type="submit" class="btn btn-success">Salvar</button>
                         <div class="edit-daily-form-container error-message"></div>
                     </form>
                   </div>
            `;
            dailyReadingLog.appendChild(readingItem);
              const editButton = readingItem.querySelector('.edit-daily-button');
                const editContainer = readingItem.querySelector('.edit-daily-form-container');
              const closeButton = readingItem.querySelector('.close-daily-edit-button')
             
                 editButton.addEventListener('click', () => {
                     editDailyId = index;
                     editContainer.style.display = 'block';
                  });
                 closeButton.addEventListener('click', (event) => {
                       event.preventDefault();
                     editContainer.style.display = 'none';
                 });
               const editForm = readingItem.querySelector(`#edit-daily-form-${index}`);
               if(editForm) {
                  editForm.addEventListener('submit', (event) => {
                       event.preventDefault();
                      clearErrors();
                         const isValid = validateForm(editForm, editContainer.querySelector('.edit-daily-form-container .error-message'));
                      if(isValid){
                          const editedPages = document.getElementById(`edit-daily-pages-${index}`).value;
                         const dailyReadings = JSON.parse(localStorage.getItem('dailyReadings'))
                        dailyReadings[index] = {
                             ...dailyReadings[index],
                             pages: editedPages
                        }
                          localStorage.setItem('dailyReadings', JSON.stringify(dailyReadings));
                         loadDailyReadings();
                         loadDailyReadingHistory();
                        editContainer.style.display = 'none';
                      }
                  })
              }
        });
        dailyPagesCount.textContent = totalPages;
    }
    function loadDailyReadingHistory() {
        const dailyReadings = localStorage.getItem('dailyReadings')
            ? JSON.parse(localStorage.getItem('dailyReadings'))
            : [];
        dailyReadingHistory.innerHTML = '';
        dailyReadings.forEach((reading,index) => {
            const readingItem = document.createElement('p');
            readingItem.innerHTML = `${reading.date}: ${reading.pages} páginas
              <button class="edit-daily-button" data-id="${index}" title="Editar">
                  <i class="fas fa-edit"></i>
                </button>
                 <div class="edit-daily-form-container"  id="edit-daily-form-${index}">
                    <form id="edit-daily-form-${index}">
                         <button class="close-daily-edit-button" title="Fechar">
                          <i class="fas fa-times"></i>
                         </button>
                       <div class="form-group">
                             <label for="edit-daily-pages-${index}">Páginas Lidas:</label>
                            <input type="number" class="form-control" id="edit-daily-pages-${index}" value="${reading.pages}" required>
                        </div>
                     <button type="submit" class="btn btn-success">Salvar</button>
                         <div class="edit-daily-form-container error-message"></div>
                     </form>
                   </div>
            `;
            dailyReadingHistory.appendChild(readingItem);

            const editButton = readingItem.querySelector('.edit-daily-button');
            const editContainer = readingItem.querySelector('.edit-daily-form-container');
            const closeButton = readingItem.querySelector('.close-daily-edit-button');
              editButton.addEventListener('click', () => {
                editDailyId = index;
                  editContainer.style.display = 'block';
               });
           closeButton.addEventListener('click', (event) => {
                event.preventDefault();
               editContainer.style.display = 'none';
             });
           const editForm = readingItem.querySelector(`#edit-daily-form-${index}`);
                if(editForm) {
                 editForm.addEventListener('submit', (event) => {
                     event.preventDefault();
                     clearErrors();
                    const isValid = validateForm(editForm, editContainer.querySelector('.edit-daily-form-container .error-message'));
                       if(isValid){
                         const editedPages = document.getElementById(`edit-daily-pages-${index}`).value;
                        const dailyReadings = JSON.parse(localStorage.getItem('dailyReadings'));
                        dailyReadings[index] = {
                             ...dailyReadings[index],
                            pages: editedPages
                        };
                       localStorage.setItem('dailyReadings', JSON.stringify(dailyReadings));
                      loadDailyReadings();
                        loadDailyReadingHistory();
                       editContainer.style.display = 'none';
                       }
                   });
                }
         });
    }

    loadDailyReadingHistory();
    loadDailyReadings();
    loadGoals();
    loadBooks();

    function updateAuthButtons() {
        if (isLoggedIn) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            configGoalBtn.style.display = 'inline-block';
        } else {
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            configGoalBtn.style.display = 'none';
        }
    }
    updateAuthButtons();

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrors();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const isValid = validateForm(loginForm, document.querySelector('.login-error-message'));

        if (isValid) {
            if (username === 'user' && password === '123') {
                loginContainer.style.display = 'none';
                signupContainer.style.display = 'none';
                dashboard.style.display = 'block';
                libraryContent.style.display = 'block';
                isLoggedIn = true;
                updateAuthButtons();
                loadBooks(categoryFilter.value);
                loadDailyReadingHistory();
            } else {
                const errorMessage = document.createElement('p');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'Usuário ou senha incorretos.';
                document.querySelector('.login-form-container .error-message').appendChild(errorMessage);
            }
        }
    });

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrors();

        const isValid = validateForm(signupForm, document.querySelector('.signup-error-message'));

        if (isValid) {
            const username = document.getElementById('signup-username').value;
            const password = document.getElementById('signup-password').value;

            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password: password }),
            })
            .then(response => {
                if (response.ok) {
                    alert('Conta criada com sucesso!');
                    loginContainer.style.display = 'block';
                    signupContainer.style.display = 'none';
                } else {
                     const errorMessage = document.createElement('p');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = 'Erro ao criar a conta, verifique os dados.';
                    document.querySelector('.signup-form-container .error-message').appendChild(errorMessage);
                 }
            })
             .catch((error) => {
                  const errorMessage = document.createElement('p');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = 'Ocorreu um erro ao processar a requisição.';
                     document.querySelector('.signup-form-container .error-message').appendChild(errorMessage)
           });

        }
    });

    showSignupLink.addEventListener('click', function (event) {
        event.preventDefault();
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
    });

    showLoginLink.addEventListener('click', function (event) {
        event.preventDefault();
        signupContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    addBookButton.addEventListener('click', function () {
        addBookFormContainer.style.display = 'block';
    });

    cancelAddBookButton.addEventListener('click', function (event) {
        event.preventDefault();
        addBookFormContainer.style.display = 'none';
    });

    addBookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrors();
        const errorDiv = document.querySelector('#add-book-form-container .error-message');
        const isValid = validateForm(addBookForm, errorDiv);

        if (isValid) {
            const title = document.getElementById('book-title').value;
            const author = document.getElementById('book-author').value;
            const cover = document.getElementById('book-cover').value;
            const comments = document.getElementById('book-comments').value;
            const rating = document.getElementById('book-rating').value;
            const category = document.getElementById('book-category').value;

            const newBook = {
                title: title,
                author: author,
                cover: cover,
                comments: comments,
                rating: rating,
                category: category
            }

            const books = localStorage.getItem('books')
                ? JSON.parse(localStorage.getItem('books'))
                : [];

            localStorage.setItem('books', JSON.stringify([...books, newBook]));

            loadBooks(categoryFilter.value);
            addBookFormContainer.style.display = 'none';
            addBookForm.reset();
        }
    });
    logoutBtn.addEventListener('click', function () {
        isLoggedIn = false;
        updateAuthButtons();
        dashboard.style.display = 'none';
        libraryContent.style.display = 'none';
        readingGoals2025.style.display = 'none';
        loginContainer.style.display = 'block';
    });
    loginBtn.addEventListener('click', function () {
        if (!isLoggedIn) {
            loginContainer.style.display = 'block';
            signupContainer.style.display = 'none';
            dashboard.style.display = 'none';
            libraryContent.style.display = 'none';
            readingGoals2025.style.display = 'none';
        }
    });
    configGoalBtn.addEventListener('click', function () {
        readingGoals2025.style.display = 'block';
    });
    closeGoalConfig.addEventListener('click', () => {
        readingGoals2025.style.display = 'none';
    });
    categoryFilter.addEventListener('change', function () {
        loadBooks(this.value);
    });
    addGoalFormButton.addEventListener('click', function () {
        addGoalFormContainer.style.display = 'block';
    });

    cancelAddGoalButton.addEventListener('click', function (event) {
        event.preventDefault();
        addGoalFormContainer.style.display = 'none';
    });

    addGoalForm.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrors();
        const isValid = validateForm(addGoalForm, document.querySelector('#add-goal-form-container .error-message'));

        if (isValid) {
            const title = document.getElementById('goal-title').value;
            const description = document.getElementById('goal-description').value;
            const targetDate = document.getElementById('goal-target-date').value;
            const status = document.getElementById('goal-status').value;

            const newGoal = {
                title: title,
                description: description,
                targetDate: targetDate,
                status: status
            };

            const goals = localStorage.getItem('goals')
                ? JSON.parse(localStorage.getItem('goals'))
                : [];

            localStorage.setItem('goals', JSON.stringify([...goals, newGoal]));

            loadGoals();
            addGoalFormContainer.style.display = 'none';
            addGoalForm.reset();
        }
    });
    goals2025Form.addEventListener('submit', (event) => {
        event.preventDefault();

        const annualGoal = document.getElementById('annual-goal').value;
        const monthlyGoal = document.getElementById('monthly-goal').value;
        const weeklyGoal = document.getElementById('weekly-goal').value;

        localStorage.setItem('annualGoal', annualGoal);
        localStorage.setItem('monthlyGoal', monthlyGoal);
        localStorage.setItem('weeklyGoal', weeklyGoal);
        readingGoals2025.style.display = 'none';
    });
    dailyReadingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const pages = document.getElementById('daily-pages').value;
        const today = new Date();
        const date = today.toLocaleDateString();

        const newReading = {
            date: date,
            pages: pages
        }
        const dailyReadings = localStorage.getItem('dailyReadings')
            ? JSON.parse(localStorage.getItem('dailyReadings'))
            : [];

        localStorage.setItem('dailyReadings', JSON.stringify([...dailyReadings, newReading]));
        loadDailyReadings();
       loadDailyReadingHistory()
        dailyReadingForm.reset();
    });
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function () {
            const value = parseInt(this.getAttribute('data-value'));
            document.getElementById('book-rating').value = value
            stars.forEach((s, index) => {
                if (index < value) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
});