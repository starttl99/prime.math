/**
 * 소수 미로 게임 (Prime Number Maze)
 * 소수만 밟아 목적지까지 도달하는 게임화된 학습 활동
 */

// 미로 게임 클래스
class PrimeMazeGame {
    constructor(containerId, options = {}) {
        // 기본 설정값
        this.settings = {
            rows: options.rows || 8,
            cols: options.cols || 8,
            minNumber: options.minNumber || 1,
            maxNumber: options.maxNumber || 100,
            language: options.language || 'ko',
            difficulty: options.difficulty || 'beginner'
        };
        
        // 게임 상태
        this.state = {
            currentPosition: null,
            targetPosition: null,
            maze: [],
            path: [],
            gameOver: false,
            success: false,
            moves: 0,
            maxMoves: 0
        };
        
        // DOM 요소
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID "${containerId}" not found.`);
            return;
        }
        
        // 언어 설정
        this.texts = {
            ko: {
                title: "소수 미로",
                subtitle: "소수만 밟아 목적지에 도달하세요!",
                start: "시작",
                restart: "다시 시작",
                moves: "이동 횟수",
                maxMoves: "최대 이동 횟수",
                success: "성공! 목적지에 도달했습니다!",
                failure: "실패! 소수가 아닌 숫자를 밟았습니다.",
                outOfMoves: "실패! 최대 이동 횟수를 초과했습니다.",
                hint: "힌트: 소수는 1과 자기 자신으로만 나누어지는 수입니다.",
                difficultyLabel: "난이도",
                beginner: "초급",
                intermediate: "중급",
                advanced: "고급"
            },
            en: {
                title: "Prime Number Maze",
                subtitle: "Step only on prime numbers to reach the destination!",
                start: "Start",
                restart: "Restart",
                moves: "Moves",
                maxMoves: "Max Moves",
                success: "Success! You've reached the destination!",
                failure: "Failed! You stepped on a non-prime number.",
                outOfMoves: "Failed! You've exceeded the maximum number of moves.",
                hint: "Hint: Prime numbers are only divisible by 1 and themselves.",
                difficultyLabel: "Difficulty",
                beginner: "Beginner",
                intermediate: "Intermediate",
                advanced: "Advanced"
            }
        };
        
        // 난이도 설정
        this.difficulties = {
            beginner: {
                rows: 6,
                cols: 6,
                minNumber: 1,
                maxNumber: 30,
                maxMoves: 12
            },
            intermediate: {
                rows: 8,
                cols: 8,
                minNumber: 1,
                maxNumber: 50,
                maxMoves: 16
            },
            advanced: {
                rows: 10,
                cols: 10,
                minNumber: 1,
                maxNumber: 100,
                maxMoves: 20
            }
        };
        
        // 난이도 적용
        if (this.difficulties[this.settings.difficulty]) {
            Object.assign(this.settings, this.difficulties[this.settings.difficulty]);
        }
        
        this.state.maxMoves = this.settings.maxMoves;
        
        // 게임 초기화
        this.init();
    }
    
    // 게임 초기화
    init() {
        this.createUI();
        this.generateMaze();
        this.renderMaze();
    }
    
    // UI 생성
    createUI() {
        const lang = this.settings.language;
        const texts = this.texts[lang];
        
        this.container.innerHTML = '';
        this.container.className = 'prime-maze-container';
        
        // 게임 헤더
        const header = document.createElement('div');
        header.className = 'maze-header';
        header.innerHTML = `
            <h2>${texts.title}</h2>
            <p>${texts.subtitle}</p>
        `;
        
        // 게임 컨트롤
        const controls = document.createElement('div');
        controls.className = 'maze-controls';
        
        // 난이도 선택
        const difficultyControl = document.createElement('div');
        difficultyControl.className = 'difficulty-control';
        difficultyControl.innerHTML = `
            <label>${texts.difficultyLabel}: </label>
            <select id="maze-difficulty">
                <option value="beginner" ${this.settings.difficulty === 'beginner' ? 'selected' : ''}>${texts.beginner}</option>
                <option value="intermediate" ${this.settings.difficulty === 'intermediate' ? 'selected' : ''}>${texts.intermediate}</option>
                <option value="advanced" ${this.settings.difficulty === 'advanced' ? 'selected' : ''}>${texts.advanced}</option>
            </select>
        `;
        
        // 시작/재시작 버튼
        const startButton = document.createElement('button');
        startButton.id = 'maze-start-btn';
        startButton.className = 'maze-btn';
        startButton.textContent = texts.start;
        
        controls.appendChild(difficultyControl);
        controls.appendChild(startButton);
        
        // 게임 상태 표시
        const status = document.createElement('div');
        status.className = 'maze-status';
        status.innerHTML = `
            <div class="status-item">
                <span>${texts.moves}:</span>
                <span id="maze-moves">0</span>
            </div>
            <div class="status-item">
                <span>${texts.maxMoves}:</span>
                <span id="maze-max-moves">${this.state.maxMoves}</span>
            </div>
        `;
        
        // 게임 보드
        const board = document.createElement('div');
        board.id = 'maze-board';
        board.className = 'maze-board';
        
        // 게임 메시지
        const message = document.createElement('div');
        message.id = 'maze-message';
        message.className = 'maze-message';
        message.innerHTML = `<p>${texts.hint}</p>`;
        
        // UI 요소 추가
        this.container.appendChild(header);
        this.container.appendChild(controls);
        this.container.appendChild(status);
        this.container.appendChild(board);
        this.container.appendChild(message);
        
        // 이벤트 리스너 등록
        document.getElementById('maze-difficulty').addEventListener('change', (e) => {
            this.settings.difficulty = e.target.value;
            Object.assign(this.settings, this.difficulties[this.settings.difficulty]);
            this.state.maxMoves = this.settings.maxMoves;
            document.getElementById('maze-max-moves').textContent = this.state.maxMoves;
            this.generateMaze();
            this.renderMaze();
        });
        
        document.getElementById('maze-start-btn').addEventListener('click', () => {
            this.generateMaze();
            this.renderMaze();
        });
    }
    
    // 미로 생성
    generateMaze() {
        const { rows, cols, minNumber, maxNumber } = this.settings;
        
        // 게임 상태 초기화
        this.state.maze = [];
        this.state.path = [];
        this.state.gameOver = false;
        this.state.success = false;
        this.state.moves = 0;
        
        // 숫자 범위 생성
        const numbers = [];
        for (let i = minNumber; i <= maxNumber; i++) {
            numbers.push(i);
        }
        
        // 숫자 섞기
        this.shuffleArray(numbers);
        
        // 미로 배열 생성
        let index = 0;
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(numbers[index++]);
                if (index >= numbers.length) index = 0;
            }
            this.state.maze.push(row);
        }
        
        // 시작 위치 설정 (소수인 위치로)
        let startFound = false;
        for (let i = 0; i < rows && !startFound; i++) {
            for (let j = 0; j < cols && !startFound; j++) {
                if (this.isPrime(this.state.maze[i][j])) {
                    this.state.currentPosition = { row: i, col: j };
                    this.state.path.push({ row: i, col: j });
                    startFound = true;
                }
            }
        }
        
        // 목표 위치 설정 (시작 위치와 다른 소수인 위치로)
        let targetFound = false;
        for (let i = rows - 1; i >= 0 && !targetFound; i--) {
            for (let j = cols - 1; j >= 0 && !targetFound; j--) {
                if (this.isPrime(this.state.maze[i][j]) && 
                    (i !== this.state.currentPosition.row || j !== this.state.currentPosition.col)) {
                    this.state.targetPosition = { row: i, col: j };
                    targetFound = true;
                }
            }
        }
    }
    
    // 미로 렌더링
    renderMaze() {
        const board = document.getElementById('maze-board');
        const movesElement = document.getElementById('maze-moves');
        const messageElement = document.getElementById('maze-message');
        const lang = this.settings.language;
        const texts = this.texts[lang];
        
        // 보드 초기화
        board.innerHTML = '';
        board.style.gridTemplateRows = `repeat(${this.settings.rows}, 1fr)`;
        board.style.gridTemplateColumns = `repeat(${this.settings.cols}, 1fr)`;
        
        // 이동 횟수 업데이트
        movesElement.textContent = this.state.moves;
        
        // 메시지 초기화
        messageElement.innerHTML = `<p>${texts.hint}</p>`;
        messageElement.className = 'maze-message';
        
        // 게임 종료 상태 확인
        if (this.state.gameOver) {
            if (this.state.success) {
                messageElement.innerHTML = `<p class="success">${texts.success}</p>`;
                messageElement.className = 'maze-message success';
            } else if (this.state.moves >= this.state.maxMoves) {
                messageElement.innerHTML = `<p class="failure">${texts.outOfMoves}</p>`;
                messageElement.className = 'maze-message failure';
            } else {
                messageElement.innerHTML = `<p class="failure">${texts.failure}</p>`;
                messageElement.className = 'maze-message failure';
            }
            
            // 재시작 버튼 텍스트 변경
            document.getElementById('maze-start-btn').textContent = texts.restart;
        } else {
            document.getElementById('maze-start-btn').textContent = texts.restart;
        }
        
        // 미로 셀 생성
        for (let i = 0; i < this.settings.rows; i++) {
            for (let j = 0; j < this.settings.cols; j++) {
                const cell = document.createElement('div');
                cell.className = 'maze-cell';
                cell.textContent = this.state.maze[i][j];
                
                // 현재 위치 표시
                if (this.state.currentPosition && i === this.state.currentPosition.row && j === this.state.currentPosition.col) {
                    cell.classList.add('current');
                }
                
                // 목표 위치 표시
                if (this.state.targetPosition && i === this.state.targetPosition.row && j === this.state.targetPosition.col) {
                    cell.classList.add('target');
                }
                
                // 경로 표시
                if (this.isInPath(i, j)) {
                    cell.classList.add('path');
                }
                
                // 소수 표시
                if (this.isPrime(this.state.maze[i][j])) {
                    cell.classList.add('prime');
                }
                
                // 클릭 이벤트 추가
                if (!this.state.gameOver) {
                    cell.addEventListener('click', () => this.moveToCell(i, j));
                }
                
                board.appendChild(cell);
            }
        }
    }
    
    // 셀로 이동
    moveToCell(row, col) {
        // 게임이 종료되었거나 이동할 수 없는 위치면 무시
        if (this.state.gameOver || !this.canMoveTo(row, col)) {
            return;
        }
        
        // 이동 횟수 증가
        this.state.moves++;
        
        // 현재 위치 업데이트
        this.state.currentPosition = { row, col };
        this.state.path.push({ row, col });
        
        // 소수가 아닌 곳으로 이동하면 게임 오버
        if (!this.isPrime(this.state.maze[row][col])) {
            this.state.gameOver = true;
            this.state.success = false;
        }
        
        // 목표 위치에 도달하면 성공
        if (row === this.state.targetPosition.row && col === this.state.targetPosition.col) {
            this.state.gameOver = true;
            this.state.success = true;
        }
        
        // 최대 이동 횟수 초과 시 게임 오버
        if (this.state.moves >= this.state.maxMoves && !this.state.success) {
            this.state.gameOver = true;
            this.state.success = false;
        }
        
        // 미로 다시 그리기
        this.renderMaze();
    }
    
    // 이동 가능 여부 확인
    canMoveTo(row, col) {
        // 범위 확인
        if (row < 0 || row >= this.settings.rows || col < 0 || col >= this.settings.cols) {
            return false;
        }
        
        // 현재 위치에서 상하좌우로만 이동 가능
        const { row: currentRow, col: currentCol } = this.state.currentPosition;
        const isAdjacent = (
            (Math.abs(row - currentRow) === 1 && col === currentCol) ||
            (Math.abs(col - currentCol) === 1 && row === currentRow)
        );
        
        return isAdjacent;
    }
    
    // 경로에 포함되어 있는지 확인
    isInPath(row, col) {
        return this.state.path.some(pos => pos.row === row && pos.col === col);
    }
    
    // 소수 판별
    isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        
        return true;
    }
    
    // 배열 섞기 (Fisher-Yates 알고리즘)
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    // 언어 설정
    setLanguage(lang) {
        if (this.texts[lang]) {
            this.settings.language = lang;
            this.createUI();
            this.renderMaze();
            return true;
        }
        return false;
    }
}

// 소수 퍼즐 게임 클래스
class PrimePuzzleGame {
    constructor(containerId, options = {}) {
        // 기본 설정값
        this.settings = {
            rows: options.rows || 10,
            cols: options.cols || 10,
            minNumber: options.minNumber || 1,
            maxNumber: options.maxNumber || 100,
            language: options.language || 'ko',
            difficulty: options.difficulty || 'beginner',
            imageType: options.imageType || 'pattern'
        };
        
        // 게임 상태
        this.state = {
            puzzle: [],
            coloredCells: [],
            completed: false,
            correctCells: 0,
            totalPrimeCells: 0
        };
        
        // DOM 요소
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID "${containerId}" not found.`);
            return;
        }
        
        // 언어 설정
        this.texts = {
            ko: {
                title: "소수 퍼즐",
                subtitle: "소수인 숫자만 색칠하여 숨겨진 그림을 찾으세요!",
                start: "시작",
                restart: "다시 시작",
                progress: "진행 상황",
                completed: "완료! 숨겨진 그림을 찾았습니다!",
                hint: "힌트: 소수는 1과 자기 자신으로만 나누어지는 수입니다.",
                difficultyLabel: "난이도",
                beginner: "초급",
                intermediate: "중급",
                advanced: "고급",
                imageTypeLabel: "그림 유형",
                pattern: "패턴",
                animal: "동물",
                shape: "도형"
            },
            en: {
                title: "Prime Puzzle",
                subtitle: "Color only the prime numbers to reveal the hidden image!",
                start: "Start",
                restart: "Restart",
                progress: "Progress",
                completed: "Completed! You've found the hidden image!",
                hint: "Hint: Prime numbers are only divisible by 1 and themselves.",
                difficultyLabel: "Difficulty",
                beginner: "Beginner",
                intermediate: "Intermediate",
                advanced: "Advanced",
                imageTypeLabel: "Image Type",
                pattern: "Pattern",
                animal: "Animal",
                shape: "Shape"
            }
        };
        
        // 난이도 설정
        this.difficulties = {
            beginner: {
                rows: 8,
                cols: 8,
                minNumber: 1,
                maxNumber: 30
            },
            intermediate: {
                rows: 10,
                cols: 10,
                minNumber: 1,
                maxNumber: 50
            },
            advanced: {
                rows: 12,
                cols: 12,
                minNumber: 1,
                maxNumber: 100
            }
        };
        
        // 난이도 적용
        if (this.difficulties[this.settings.difficulty]) {
            Object.assign(this.settings, this.difficulties[this.settings.difficulty]);
        }
        
        // 게임 초기화
        this.init();
    }
    
    // 게임 초기화
    init() {
        this.createUI();
        this.generatePuzzle();
        this.renderPuzzle();
    }
    
    // UI 생성
    createUI() {
        const lang = this.settings.language;
        const texts = this.texts[lang];
        
        this.container.innerHTML = '';
        this.container.className = 'prime-puzzle-container';
        
        // 게임 헤더
        const header = document.createElement('div');
        header.className = 'puzzle-header';
        header.innerHTML = `
            <h2>${texts.title}</h2>
            <p>${texts.subtitle}</p>
        `;
        
        // 게임 컨트롤
        const controls = document.createElement('div');
        controls.className = 'puzzle-controls';
        
        // 난이도 선택
        const difficultyControl = document.createElement('div');
        difficultyControl.className = 'control-item';
        difficultyControl.innerHTML = `
            <label>${texts.difficultyLabel}: </label>
            <select id="puzzle-difficulty">
                <option value="beginner" ${this.settings.difficulty === 'beginner' ? 'selected' : ''}>${texts.beginner}</option>
                <option value="intermediate" ${this.settings.difficulty === 'intermediate' ? 'selected' : ''}>${texts.intermediate}</option>
                <option value="advanced" ${this.settings.difficulty === 'advanced' ? 'selected' : ''}>${texts.advanced}</option>
            </select>
        `;
        
        // 그림 유형 선택
        const imageTypeControl = document.createElement('div');
        imageTypeControl.className = 'control-item';
        imageTypeControl.innerHTML = `
            <label>${texts.imageTypeLabel}: </label>
            <select id="puzzle-image-type">
                <option value="pattern" ${this.settings.imageType === 'pattern' ? 'selected' : ''}>${texts.pattern}</option>
                <option value="animal" ${this.settings.imageType === 'animal' ? 'selected' : ''}>${texts.animal}</option>
                <option value="shape" ${this.settings.imageType === 'shape' ? 'selected' : ''}>${texts.shape}</option>
            </select>
        `;
        
        // 시작/재시작 버튼
        const startButton = document.createElement('button');
        startButton.id = 'puzzle-start-btn';
        startButton.className = 'puzzle-btn';
        startButton.textContent = texts.start;
        
        controls.appendChild(difficultyControl);
        controls.appendChild(imageTypeControl);
        controls.appendChild(startButton);
        
        // 게임 상태 표시
        const status = document.createElement('div');
        status.className = 'puzzle-status';
        status.innerHTML = `
            <div class="status-item">
                <span>${texts.progress}:</span>
                <div class="progress-bar">
                    <div id="puzzle-progress" class="progress-fill" style="width: 0%"></div>
                </div>
                <span id="puzzle-progress-text">0%</span>
            </div>
        `;
        
        // 게임 보드
        const board = document.createElement('div');
        board.id = 'puzzle-board';
        board.className = 'puzzle-board';
        
        // 게임 메시지
        const message = document.createElement('div');
        message.id = 'puzzle-message';
        message.className = 'puzzle-message';
        message.innerHTML = `<p>${texts.hint}</p>`;
        
        // UI 요소 추가
        this.container.appendChild(header);
        this.container.appendChild(controls);
        this.container.appendChild(status);
        this.container.appendChild(board);
        this.container.appendChild(message);
        
        // 이벤트 리스너 등록
        document.getElementById('puzzle-difficulty').addEventListener('change', (e) => {
            this.settings.difficulty = e.target.value;
            Object.assign(this.settings, this.difficulties[this.settings.difficulty]);
            this.generatePuzzle();
            this.renderPuzzle();
        });
        
        document.getElementById('puzzle-image-type').addEventListener('change', (e) => {
            this.settings.imageType = e.target.value;
            this.generatePuzzle();
            this.renderPuzzle();
        });
        
        document.getElementById('puzzle-start-btn').addEventListener('click', () => {
            this.generatePuzzle();
            this.renderPuzzle();
        });
    }
    
    // 퍼즐 생성
    generatePuzzle() {
        const { rows, cols, minNumber, maxNumber, imageType } = this.settings;
        
        // 게임 상태 초기화
        this.state.puzzle = [];
        this.state.coloredCells = [];
        this.state.completed = false;
        this.state.correctCells = 0;
        this.state.totalPrimeCells = 0;
        
        // 숫자 범위 생성
        const numbers = [];
        for (let i = minNumber; i <= maxNumber; i++) {
            numbers.push(i);
        }
        
        // 숫자 섞기
        this.shuffleArray(numbers);
        
        // 퍼즐 배열 생성
        let index = 0;
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(numbers[index++]);
                if (index >= numbers.length) index = 0;
                
                // 소수 개수 카운트
                if (this.isPrime(numbers[index - 1])) {
                    this.state.totalPrimeCells++;
                }
            }
            this.state.puzzle.push(row);
        }
        
        // 숨겨진 그림 생성
        this.generateHiddenImage(imageType);
    }
    
    // 숨겨진 그림 생성
    generateHiddenImage(type) {
        const { rows, cols } = this.settings;
        
        // 그림 패턴 정의
        const patterns = {
            pattern: () => {
                // 체크 무늬 패턴
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        if ((i + j) % 2 === 0 && this.isPrime(this.state.puzzle[i][j])) {
                            this.state.coloredCells.push({ row: i, col: j });
                        }
                    }
                }
            },
            animal: () => {
                // 간단한 동물 모양 (예: 고양이 얼굴)
                const centerRow = Math.floor(rows / 2);
                const centerCol = Math.floor(cols / 2);
                const radius = Math.min(centerRow, centerCol) - 1;
                
                // 원형 얼굴
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        const distance = Math.sqrt(Math.pow(i - centerRow, 2) + Math.pow(j - centerCol, 2));
                        if (distance <= radius && this.isPrime(this.state.puzzle[i][j])) {
                            this.state.coloredCells.push({ row: i, col: j });
                        }
                    }
                }
                
                // 귀
                if (centerRow - radius - 1 >= 0 && centerCol - radius >= 0 && this.isPrime(this.state.puzzle[centerRow - radius - 1][centerCol - radius])) {
                    this.state.coloredCells.push({ row: centerRow - radius - 1, col: centerCol - radius });
                }
                if (centerRow - radius - 1 >= 0 && centerCol + radius < cols && this.isPrime(this.state.puzzle[centerRow - radius - 1][centerCol + radius])) {
                    this.state.coloredCells.push({ row: centerRow - radius - 1, col: centerCol + radius });
                }
            },
            shape: () => {
                // 간단한 도형 (예: 하트)
                const centerRow = Math.floor(rows / 2);
                const centerCol = Math.floor(cols / 2);
                const size = Math.min(centerRow, centerCol) - 1;
                
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        // 하트 모양 수식
                        const x = (j - centerCol) / size;
                        const y = (i - centerRow) / size;
                        const inHeart = Math.pow(x, 2) + Math.pow(y - 0.25, 2) - 0.75 <= 0;
                        
                        if (inHeart && this.isPrime(this.state.puzzle[i][j])) {
                            this.state.coloredCells.push({ row: i, col: j });
                        }
                    }
                }
            }
        };
        
        // 선택한 유형의 패턴 생성
        if (patterns[type]) {
            patterns[type]();
        } else {
            patterns.pattern(); // 기본값
        }
    }
    
    // 퍼즐 렌더링
    renderPuzzle() {
        const board = document.getElementById('puzzle-board');
        const progressElement = document.getElementById('puzzle-progress');
        const progressTextElement = document.getElementById('puzzle-progress-text');
        const messageElement = document.getElementById('puzzle-message');
        const lang = this.settings.language;
        const texts = this.texts[lang];
        
        // 보드 초기화
        board.innerHTML = '';
        board.style.gridTemplateRows = `repeat(${this.settings.rows}, 1fr)`;
        board.style.gridTemplateColumns = `repeat(${this.settings.cols}, 1fr)`;
        
        // 진행 상황 업데이트
        const progress = this.state.correctCells / this.state.coloredCells.length * 100;
        progressElement.style.width = `${progress}%`;
        progressTextElement.textContent = `${Math.round(progress)}%`;
        
        // 메시지 초기화
        messageElement.innerHTML = `<p>${texts.hint}</p>`;
        messageElement.className = 'puzzle-message';
        
        // 완료 상태 확인
        if (this.state.completed) {
            messageElement.innerHTML = `<p class="success">${texts.completed}</p>`;
            messageElement.className = 'puzzle-message success';
            
            // 재시작 버튼 텍스트 변경
            document.getElementById('puzzle-start-btn').textContent = texts.restart;
        } else {
            document.getElementById('puzzle-start-btn').textContent = texts.restart;
        }
        
        // 퍼즐 셀 생성
        for (let i = 0; i < this.settings.rows; i++) {
            for (let j = 0; j < this.settings.cols; j++) {
                const cell = document.createElement('div');
                cell.className = 'puzzle-cell';
                cell.textContent = this.state.puzzle[i][j];
                
                // 소수 표시
                if (this.isPrime(this.state.puzzle[i][j])) {
                    cell.classList.add('prime');
                }
                
                // 색칠된 셀 표시
                const isColored = this.isInColoredCells(i, j);
                const isSelected = this.state.coloredCells.some(pos => 
                    pos.row === i && pos.col === j && this.isPrime(this.state.puzzle[i][j])
                );
                
                if (isSelected) {
                    cell.classList.add('colored');
                }
                
                // 클릭 이벤트 추가
                if (!this.state.completed) {
                    cell.addEventListener('click', () => this.toggleCell(i, j));
                }
                
                board.appendChild(cell);
            }
        }
    }
    
    // 셀 토글
    toggleCell(row, col) {
        const num = this.state.puzzle[row][col];
        const isPrime = this.isPrime(num);
        const isInColoredCells = this.isInColoredCells(row, col);
        
        // 소수인 경우만 토글 가능
        if (isPrime) {
            const cell = document.querySelector(`.puzzle-cell:nth-child(${row * this.settings.cols + col + 1})`);
            
            if (cell.classList.contains('selected')) {
                cell.classList.remove('selected');
                
                // 정답 셀이었다면 정답 카운트 감소
                if (isInColoredCells) {
                    this.state.correctCells--;
                }
            } else {
                cell.classList.add('selected');
                
                // 정답 셀이라면 정답 카운트 증가
                if (isInColoredCells) {
                    this.state.correctCells++;
                    
                    // 모든 정답 셀을 찾았는지 확인
                    if (this.state.correctCells === this.state.coloredCells.length) {
                        this.state.completed = true;
                    }
                }
            }
            
            // 진행 상황 업데이트
            this.updateProgress();
            
            // 완료 확인
            if (this.state.completed) {
                this.renderPuzzle();
            }
        }
    }
    
    // 진행 상황 업데이트
    updateProgress() {
        const progressElement = document.getElementById('puzzle-progress');
        const progressTextElement = document.getElementById('puzzle-progress-text');
        
        const progress = this.state.correctCells / this.state.coloredCells.length * 100;
        progressElement.style.width = `${progress}%`;
        progressTextElement.textContent = `${Math.round(progress)}%`;
    }
    
    // 색칠된 셀에 포함되어 있는지 확인
    isInColoredCells(row, col) {
        return this.state.coloredCells.some(pos => pos.row === row && pos.col === col);
    }
    
    // 소수 판별
    isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        
        return true;
    }
    
    // 배열 섞기 (Fisher-Yates 알고리즘)
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    // 언어 설정
    setLanguage(lang) {
        if (this.texts[lang]) {
            this.settings.language = lang;
            this.createUI();
            this.renderPuzzle();
            return true;
        }
        return false;
    }
}
