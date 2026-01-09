// Admin credentials (in production, this should be on the server)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: '@Aya.2010' // Change this to a secure password
};

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadContent();
        initNavigation();
        // Don't load announcements here - wait for section to be shown
    }
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('adminLoggedIn', 'true');
        errorDiv.style.display = 'none';
        checkAuth();
    } else {
        errorDiv.textContent = 'Kullanıcı adı veya şifre hatalı!';
        errorDiv.style.display = 'block';
    }
});

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.reload();
});

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.admin-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('data-section');

            // Update active nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Show target section
            sections.forEach(sec => sec.style.display = 'none');
            const sectionElement = document.getElementById(targetSection + 'Section');
            if (sectionElement) {
                sectionElement.style.display = 'block';
                
                // Load section-specific data
                if (targetSection === 'announcements') {
                    // Force load announcements when section is shown
                    setTimeout(() => {
                        loadAnnouncements();
                    }, 150);
                } else if (targetSection === 'gallery') {
                    setTimeout(() => {
                        if (galleryPhotos.length === 0) {
                            loadGalleryPhotos();
                        }
                    }, 100);
                }
            }

            // Scroll to top
            document.querySelector('.admin-content').scrollTop = 0;
        });
    });
}

// Load content from localStorage or defaults
function loadContent() {
    const saved = localStorage.getItem('siteContent');
    const content = saved ? JSON.parse(saved) : getDefaultContent();

    // Hero
    document.getElementById('heroTitle').value = content.hero.title || '';
    document.getElementById('heroDescription').value = content.hero.description || '';
    document.getElementById('heroEyebrow').value = content.hero.eyebrow || '';
    // Hero card
    document.getElementById('heroCardEyebrowInput').value = content.heroCard.eyebrow || '';
    document.getElementById('heroCardBadgeInput').value = content.heroCard.badge || '';
    document.getElementById('heroCardTitleInput').value = content.heroCard.title || '';
    document.getElementById('heroCardBullet1Input').value = content.heroCard.bullet1 || '';
    document.getElementById('heroCardBullet2Input').value = content.heroCard.bullet2 || '';
    document.getElementById('heroCardBullet3Input').value = content.heroCard.bullet3 || '';
    document.getElementById('heroCardBullet4Input').value = content.heroCard.bullet4 || '';
    document.getElementById('heroCardCtaTextInput').value = content.heroCard.ctaText || '';
    document.getElementById('heroCardCtaLinkInput').value = content.heroCard.ctaLink || '';
    document.getElementById('heroCardPhoneTextInput').value = content.heroCard.phoneText || '';
    document.getElementById('heroCardPhoneLinkInput').value = content.heroCard.phoneLink || '';
    document.getElementById('heroCardTrustInput').value = content.heroCard.trust || '';

    // About
    document.getElementById('aboutTitle').value = content.about.title || '';
    document.getElementById('aboutDescription').value = content.about.description || '';
    document.getElementById('aboutVision').value = content.about.vision || '';
    document.getElementById('aboutMission').value = content.about.mission || '';

    // Programs
    document.getElementById('programStart').value = content.programs.start || '';
    document.getElementById('programTech').value = content.programs.tech || '';
    document.getElementById('programPerf').value = content.programs.perf || '';
    document.getElementById('programMaster').value = content.programs.master || '';

    // Announcements - handled by loadAnnouncements()

    // Team
    document.getElementById('teamDoganRole').value = content.team.dogan.role || '';
    document.getElementById('teamDoganDesc').value = content.team.dogan.desc || '';
    document.getElementById('teamKorayRole').value = content.team.koray.role || '';
    document.getElementById('teamKorayDesc').value = content.team.koray.desc || '';
    document.getElementById('teamHuseyinRole').value = content.team.huseyin.role || '';
    document.getElementById('teamHuseyinDesc').value = content.team.huseyin.desc || '';
    document.getElementById('teamOytunRole').value = content.team.oytun.role || '';
    document.getElementById('teamOytunDesc').value = content.team.oytun.desc || '';

    // Contact
    document.getElementById('contactAddress').value = content.contact.address || '';
    document.getElementById('contactPhone').value = content.contact.phone || '';
    document.getElementById('contactEmail').value = content.contact.email || '';
}

// Get default content from current site
function getDefaultContent() {
    return {
        hero: {
            title: 'Güçlü teknik, güvenli adımlar, yüksek performans',
            description: '150\'den fazla lisanslı sporcumuzla, Ankara\'nın kalbinde yüzme eğitimi, performans programları ve sporcu gelişimi.',
            eyebrow: 'Profesyonel yüzme ekibi'
        },
        heroCard: {
            eyebrow: 'Sezon Kaydı',
            badge: 'Aktif',
            title: '2024-2025 Başvuruları',
            bullet1: '3-6 yaş suyla tanışma ve güven',
            bullet2: '7-12 yaş teknik geliştirme',
            bullet3: 'Performans ve master grupları',
            bullet4: 'Olimpik havuzda birebir analiz',
            ctaText: 'Online başvuru yap',
            ctaLink: '#',
            phoneText: '0 506 495 11 17',
            phoneLink: 'tel:+905064951117',
            trust: '2015 Ankara Küme Yüzme Yarışları Şampiyonu'
        },
        about: {
            title: 'Çocuklar ve gençler için sürdürülebilir yüzme kültürü',
            description: 'Ankara Yüzme Akademisi, Doğan Alkan tarafından 2010\'da kuruldu. 10 sporcu ile başlayan yolculuk, kısa sürede 150\'den fazla lisanslı sporcuya, ulusal başarılara ve milli takıma yükselen sporculara dönüştü.',
            vision: 'Sporu yaşam biçimi haline getiren, özgüvenli ve mutlu çocuklar yetiştirmek.',
            mission: 'Disiplinli, sağlıklı ve mücadele gücü yüksek sporcuları ulusal ve uluslararası arenaya hazırlamak.'
        },
        programs: {
            start: 'Suyu tanıma, adaptasyon ve temel sırt-serbest teknikleri ile güvenli giriş.',
            tech: '6-12 yaş için dört stil tekniği, nefes, dönüş ve çıkış çalışmaları.',
            perf: 'Seçme odaklı periyotlanmış antrenman, kara çalışmaları ve yarış stratejisi.',
            master: 'Yetişkinler için kondisyon, teknik ve sağlıklı yaşam odaklı özel seanslar.'
        },
        announcements: {
            materials: 'Mayo, bone, havuz gözlüğü, havlu ve kaymaz terlik ile gelmenizi öneririz.',
            license: 'Sağlık raporu, 6 fotoğraf, nüfus cüzdan sureti ve ikametgah belgesi yeterli.',
            system: 'Yaşa ve seviyeye göre gruplanmış antrenman; performans grupları seçme ile ilerler.',
            nutrition: 'Spor öncesi hafif kahvaltı, lifli ara öğünler ve antrenman sonrası toparlanma atıştırmalığı.'
        },
        team: {
            dogan: {
                role: 'Kurucu & Baş Antrenör',
                desc: '4. Kademe antrenör, milli sporcu geçmişi, teknik analiz ve performans koçu.'
            },
            koray: {
                role: 'Antrenör',
                desc: '3. Kademe antrenör'
            },
            huseyin: {
                role: 'Baş Antrenör',
                desc: '4. Kademe antrenör, olimpik havuz deneyimi, kara çalışması uzmanı.'
            },
            oytun: {
                role: 'Yardımcı Antrenör',
                desc: '2 yıldız bröveli yüzücü, teknik geliştirme ve çocuk grupları koçu.'
            }
        },
        contact: {
            address: 'Ahlatlıbel, İncek Şht. Savcı Mehmet Selim Kiraz Blv No:129, 06805 Gölbaşı / Ankara',
            phone: '0 506 495 11 17',
            email: 'info@ayayuzme.com'
        }
    };
}

// Save content
document.getElementById('saveBtn').addEventListener('click', () => {
    const gallerySection = document.getElementById('gallerySection');
    const isGalleryActive = gallerySection && gallerySection.style.display !== 'none';
    
    // If gallery section is active, save gallery manifest to localStorage
    if (isGalleryActive) {
        localStorage.setItem('galleryManifest', JSON.stringify(galleryPhotos));
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = '✓ Fotoğraf listesi başarıyla kaydedildi! Ana sayfada değişiklikler görünecektir.';
        const contentArea = document.querySelector('.admin-content');
        const firstSection = contentArea.querySelector('.admin-section');
        if (firstSection) {
            contentArea.insertBefore(successMsg, firstSection);
            setTimeout(() => successMsg.remove(), 5000);
        }
        return;
    }
    
    // If announcements section is active, save announcements to localStorage
    const announcementsSection = document.getElementById('announcementsSection');
    const isAnnouncementsActive = announcementsSection && announcementsSection.style.display !== 'none';
    if (isAnnouncementsActive) {
        saveAnnouncements();
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = '✓ Duyurular başarıyla kaydedildi! Ana sayfada değişiklikler görünecektir.';
        const contentArea = document.querySelector('.admin-content');
        const firstSection = contentArea.querySelector('.admin-section');
        if (firstSection) {
            contentArea.insertBefore(successMsg, firstSection);
            setTimeout(() => successMsg.remove(), 5000);
        }
        return;
    }
    
    // Save other content
    const content = {
        hero: {
            title: document.getElementById('heroTitle').value,
            description: document.getElementById('heroDescription').value,
            eyebrow: document.getElementById('heroEyebrow').value
        },
        heroCard: {
            eyebrow: document.getElementById('heroCardEyebrowInput').value,
            badge: document.getElementById('heroCardBadgeInput').value,
            title: document.getElementById('heroCardTitleInput').value,
            bullet1: document.getElementById('heroCardBullet1Input').value,
            bullet2: document.getElementById('heroCardBullet2Input').value,
            bullet3: document.getElementById('heroCardBullet3Input').value,
            bullet4: document.getElementById('heroCardBullet4Input').value,
            ctaText: document.getElementById('heroCardCtaTextInput').value,
            ctaLink: document.getElementById('heroCardCtaLinkInput').value,
            phoneText: document.getElementById('heroCardPhoneTextInput').value,
            phoneLink: document.getElementById('heroCardPhoneLinkInput').value,
            trust: document.getElementById('heroCardTrustInput').value
        },
        about: {
            title: document.getElementById('aboutTitle').value,
            description: document.getElementById('aboutDescription').value,
            vision: document.getElementById('aboutVision').value,
            mission: document.getElementById('aboutMission').value
        },
        programs: {
            start: document.getElementById('programStart').value,
            tech: document.getElementById('programTech').value,
            perf: document.getElementById('programPerf').value,
            master: document.getElementById('programMaster').value
        },
        announcements: {
            // Handled separately by saveAnnouncements()
        },
        team: {
            dogan: {
                role: document.getElementById('teamDoganRole').value,
                desc: document.getElementById('teamDoganDesc').value
            },
            koray: {
                role: document.getElementById('teamKorayRole').value,
                desc: document.getElementById('teamKorayDesc').value
            },
            huseyin: {
                role: document.getElementById('teamHuseyinRole').value,
                desc: document.getElementById('teamHuseyinDesc').value
            },
            oytun: {
                role: document.getElementById('teamOytunRole').value,
                desc: document.getElementById('teamOytunDesc').value
            }
        },
        contact: {
            address: document.getElementById('contactAddress').value,
            phone: document.getElementById('contactPhone').value,
            email: document.getElementById('contactEmail').value
        }
    };

    localStorage.setItem('siteContent', JSON.stringify(content));
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = '✓ Değişiklikler başarıyla kaydedildi! Ana sayfayı yenileyerek görebilirsiniz.';
    const contentArea = document.querySelector('.admin-content');
    const firstSection = contentArea.querySelector('.admin-section');
    if (firstSection) {
        contentArea.insertBefore(successMsg, firstSection);
        setTimeout(() => successMsg.remove(), 5000);
    }
});

// Reset content
document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Tüm değişiklikleri sıfırlamak istediğinize emin misiniz?')) {
        localStorage.removeItem('siteContent');
        loadContent();
        alert('İçerik varsayılan değerlere sıfırlandı.');
    }
});

// Gallery Management
let galleryPhotos = [];

function loadGalleryPhotos() {
    fetch('images/manifest.json')
        .then(resp => resp.json())
        .then(data => {
            galleryPhotos = data;
            renderGalleryList();
        })
        .catch(() => {
            // Fallback to default list
            galleryPhotos = [
                "2.jpg", "a1.jpg", "a10.jpg", "a11.jpg", "a12.jpg", "a13.jpg", "a14.jpg", "a15.jpg",
                "a2.jpg", "a3.jpg", "a4.jpg", "a5.jpg", "a7.jpg", "a8.jpg", "a9.jpg",
                "bn1_new.jpg", "bn2_new.jpg", "DoganAlkan.jpg", "g1.jpg", "g10.jpg", "g2.jpg", "g3.jpg", "g4.jpg",
                "g5.jpg", "g6.jpg", "g7.jpg", "g8.jpg", "g9.jpg", "madalya-eski.jpg", "madalya.jpg",
                "s1.jpg", "t1.jpg", "t3.jpg", "t4.jpg", "t5.jpg", "uclu.jpg"
            ];
            renderGalleryList();
        });
}

function renderGalleryList() {
    const galleryList = document.getElementById('galleryList');
    if (!galleryList) return;
    
    galleryList.innerHTML = '';
    
    galleryPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.draggable = true;
        item.dataset.index = index;
        
        item.innerHTML = `
            <div class="gallery-item-handle"><i class="fa fa-bars"></i></div>
            <img src="images/${photo}" alt="${photo}" class="gallery-item-preview" onerror="this.style.display='none'">
            <div class="gallery-item-info">
                <div class="gallery-item-name">${photo}</div>
                <div class="gallery-item-size">Sıra: ${index + 1}</div>
            </div>
            <div class="gallery-item-actions">
                <button type="button" class="gallery-item-delete" data-photo="${photo}">
                    <i class="fa fa-trash"></i> Sil
                </button>
            </div>
        `;
        
        // Drag and drop
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', item.outerHTML);
            e.dataTransfer.setData('text/plain', index.toString());
            item.classList.add('dragging');
        });
        
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
        
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            const afterElement = getDragAfterElement(galleryList, e.clientY);
            const dragging = document.querySelector('.dragging');
            if (afterElement == null) {
                galleryList.appendChild(dragging);
            } else {
                galleryList.insertBefore(dragging, afterElement);
            }
        });
        
        item.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const targetIndex = parseInt(item.dataset.index);
            
            if (draggedIndex !== targetIndex) {
                const draggedPhoto = galleryPhotos[draggedIndex];
                galleryPhotos.splice(draggedIndex, 1);
                galleryPhotos.splice(targetIndex, 0, draggedPhoto);
                renderGalleryList();
            }
        });
        
        // Delete button
        const deleteBtn = item.querySelector('.gallery-item-delete');
        deleteBtn.addEventListener('click', () => {
            if (confirm(`"${photo}" fotoğrafını listeden çıkarmak istediğinize emin misiniz?`)) {
                galleryPhotos = galleryPhotos.filter(p => p !== photo);
                renderGalleryList();
            }
        });
        
        galleryList.appendChild(item);
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.gallery-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// File upload handler
let selectedFile = null;
const photoUpload = document.getElementById('photoUpload');
const addPhotoBtn = document.getElementById('addPhotoBtn');
const selectedFileName = document.getElementById('selectedFileName');

if (photoUpload) {
    photoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.match(/^image\/(jpeg|jpg|png|gif|webp)$/i)) {
                alert('Lütfen geçerli bir görsel dosyası seçin (.jpg, .jpeg, .png, .gif, .webp)');
                photoUpload.value = '';
                selectedFileName.textContent = '';
                addPhotoBtn.disabled = true;
                return;
            }
            
            selectedFile = file;
            selectedFileName.textContent = `Seçilen: ${file.name}`;
            addPhotoBtn.disabled = false;
        }
    });
}

// Add new photo
if (addPhotoBtn) {
    addPhotoBtn.addEventListener('click', () => {
        if (!selectedFile) {
            alert('Lütfen önce bir dosya seçin!');
            return;
        }
        
        const photoName = selectedFile.name;
        
        if (galleryPhotos.includes(photoName)) {
            alert(`"${photoName}" zaten listede var!`);
            return;
        }
        
        galleryPhotos.push(photoName);
        renderGalleryList();
        
        // Reset file input
        photoUpload.value = '';
        selectedFileName.textContent = '';
        addPhotoBtn.disabled = true;
        selectedFile = null;
        
        alert(`"${photoName}" listeye eklendi!\n\nÖNEMLİ: Lütfen dosyayı images/ klasörüne yüklemeyi unutmayın!`);
    });
}



// Announcements management
let announcementsList = [];

const announcementsDefault = [
    { title: 'Malzeme Listesi', description: 'Mayo, bone, havuz gözlüğü, havlu ve kaymaz terlik ile gelmenizi öneririz.', tag: 'Hazırlık', highlight: false },
    { title: 'Lisans İşlemleri', description: 'Sağlık raporu, 6 fotoğraf, nüfus cüzdan sureti ve ikametgah belgesi yeterli.', tag: 'Kulüp lisansı', highlight: false },
    { title: 'Çalışma Sistemi', description: 'Yaşa ve seviyeye göre gruplanmış antrenman; performans grupları seçme ile ilerler.', tag: 'Program', highlight: false },
    { title: 'Beslenme Önerisi', description: 'Spor öncesi hafif kahvaltı, lifli ara öğünler ve antrenman sonrası toparlanma atıştırmalığı.', tag: 'Beslenme', highlight: true }
];

function loadAnnouncements() {
    console.log('loadAnnouncements called');
    const container = document.getElementById('announcementsList');
    if (!container) {
        console.warn('Container not found, retrying...');
        // Container not found, try again after a short delay
        setTimeout(() => {
            loadAnnouncements();
        }, 200);
        return;
    }
    
    console.log('Container found, loading data...');
    const saved = localStorage.getItem('announcementsList');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                announcementsList = parsed;
                console.log('Loaded from localStorage:', announcementsList.length, 'items');
            } else {
                announcementsList = [...announcementsDefault];
                console.log('Using defaults (empty array in storage)');
            }
        } catch (e) {
            console.error('Error loading announcements:', e);
            announcementsList = [...announcementsDefault];
            console.log('Using defaults (parse error)');
        }
    } else {
        announcementsList = [...announcementsDefault];
        console.log('Using defaults (no storage)');
    }
    
    console.log('Rendering', announcementsList.length, 'announcements');
    renderAnnouncementsList();
    setupAnnouncementButtons();
}

function renderAnnouncementsList() {
    console.log('renderAnnouncementsList called');
    const container = document.getElementById('announcementsList');
    if (!container) {
        console.error('announcementsList container not found in renderAnnouncementsList');
        return;
    }
    
    // Ensure announcementsList is initialized
    if (!announcementsList) {
        console.log('announcementsList is null, initializing with defaults');
        announcementsList = [...announcementsDefault];
    }
    
    // If empty, use defaults
    if (announcementsList.length === 0) {
        console.log('announcementsList is empty, using defaults');
        announcementsList = [...announcementsDefault];
    }
    
    console.log('Rendering', announcementsList.length, 'items');
    container.innerHTML = '';
    
    // Escape HTML helper function
    const escapeHtml = (text) => {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };
    
    announcementsList.forEach((item, index) => {
        const announcementItem = document.createElement('div');
        const isNew = !!item._isNew;
        announcementItem.className = `announcement-item-admin${isNew ? ' announcement-item-new' : ''}`;
        announcementItem.draggable = true;
        announcementItem.dataset.index = index;
        
        announcementItem.innerHTML = `
            <div class="drag-handle">
                <i class="fa fa-bars"></i>
            </div>
            <div class="announcement-content">
                <div class="form-group">
                    <label>Başlık</label>
                    <input type="text" class="announcement-title" value="${escapeHtml(item.title || '')}" placeholder="Duyuru başlığı">
                </div>
                <div class="form-group">
                    <label>Açıklama</label>
                    <textarea class="announcement-description" rows="2" placeholder="Duyuru açıklaması">${escapeHtml(item.description || '')}</textarea>
                </div>
                <div style="display: flex; gap: 12px; align-items: flex-end;">
                    <div class="form-group" style="flex: 1;">
                        <label>Etiket</label>
                        <input type="text" class="announcement-tag" value="${escapeHtml(item.tag || '')}" placeholder="Etiket">
                    </div>
                    <div class="form-checkbox">
                        <input type="checkbox" class="announcement-highlight" ${item.highlight ? 'checked' : ''}>
                        <label>Vurgulu göster</label>
                    </div>
                </div>
            </div>
            <div class="announcement-actions">
                <button type="button" class="btn-icon delete-announcement" title="Sil">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `;
        
        container.appendChild(announcementItem);

        // Remove new highlight after a short delay
        if (isNew) {
            setTimeout(() => {
                announcementItem.classList.remove('announcement-item-new');
                delete item._isNew;
            }, 1800);
        }
        
        // Add event listeners
        const deleteBtn = announcementItem.querySelector('.delete-announcement');
        deleteBtn.addEventListener('click', () => {
            if (confirm(`"${item.title}" duyurusunu silmek istediğinize emin misiniz?`)) {
                announcementsList.splice(index, 1);
                renderAnnouncementsList();
            }
        });
        
        // Update on input change
        const titleInput = announcementItem.querySelector('.announcement-title');
        const descInput = announcementItem.querySelector('.announcement-description');
        const tagInput = announcementItem.querySelector('.announcement-tag');
        const highlightInput = announcementItem.querySelector('.announcement-highlight');
        
        titleInput.addEventListener('input', () => {
            announcementsList[index].title = titleInput.value;
        });
        descInput.addEventListener('input', () => {
            announcementsList[index].description = descInput.value;
        });
        tagInput.addEventListener('input', () => {
            announcementsList[index].tag = tagInput.value;
        });
        highlightInput.addEventListener('change', () => {
            announcementsList[index].highlight = highlightInput.checked;
        });
    });
    
    // Setup drag and drop
    setupAnnouncementsDragDrop();
}

function setupAnnouncementsDragDrop() {
    const items = document.querySelectorAll('.announcement-item-admin');
    
    items.forEach((item, index) => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', index.toString());
            item.classList.add('dragging');
        });
        
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
        
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            const afterElement = getDragAfterElementAnnouncements(document.getElementById('announcementsList'), e.clientY);
            const dragging = document.querySelector('.announcement-item-admin.dragging');
            if (afterElement == null) {
                document.getElementById('announcementsList').appendChild(dragging);
            } else {
                document.getElementById('announcementsList').insertBefore(dragging, afterElement);
            }
        });
        
        item.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const targetIndex = parseInt(item.dataset.index);
            
            if (draggedIndex !== targetIndex) {
                const draggedAnnouncement = announcementsList[draggedIndex];
                announcementsList.splice(draggedIndex, 1);
                announcementsList.splice(targetIndex, 0, draggedAnnouncement);
                renderAnnouncementsList();
            }
        });
    });
}

function getDragAfterElementAnnouncements(container, y) {
    const draggableElements = [...container.querySelectorAll('.announcement-item-admin:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function saveAnnouncements() {
    // Collect all announcement data from inputs
    const items = document.querySelectorAll('.announcement-item-admin');
    announcementsList = [];
    
    items.forEach(item => {
        const title = item.querySelector('.announcement-title').value;
        const description = item.querySelector('.announcement-description').value;
        const tag = item.querySelector('.announcement-tag').value;
        const highlight = item.querySelector('.announcement-highlight').checked;
        
        if (title.trim()) {
            announcementsList.push({
                title: title.trim(),
                description: description.trim(),
                tag: tag.trim(),
                highlight: highlight
            });
        }
    });
    
    localStorage.setItem('announcementsList', JSON.stringify(announcementsList));
}

// Add new announcement button handler
function setupAnnouncementButtons() {
    const addBtn = document.getElementById('addAnnouncementBtn');
    if (addBtn) {
        // Remove existing listeners
        const newAddBtn = addBtn.cloneNode(true);
        addBtn.parentNode.replaceChild(newAddBtn, addBtn);
        
        newAddBtn.addEventListener('click', () => {
            if (!announcementsList) {
                announcementsList = [];
            }
            // Add to top and mark as new for visual highlight
            announcementsList.unshift({
                title: 'Yeni Duyuru',
                description: '',
                tag: 'Genel',
                highlight: false,
                _isNew: true
            });
            renderAnnouncementsList();
            // Scroll to top to show the newly added item
            const list = document.getElementById('announcementsList');
            if (list) {
                list.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
}

// Load gallery when gallery section is shown
const galleryNavItem = document.querySelector('[data-section="gallery"]');
if (galleryNavItem) {
    galleryNavItem.addEventListener('click', () => {
        setTimeout(() => {
            if (galleryPhotos.length === 0) {
                loadGalleryPhotos();
            }
        }, 100);
    });
}

// Initialize
checkAuth();

