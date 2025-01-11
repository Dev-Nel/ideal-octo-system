let users = [];
let auctionItems = [];

function addUser() {
    const username = document.getElementById('username').value;
    if (username) {
        users.push(username);
        alert('User added: ' + username);
        document.getElementById('username').value = '';
    } else {
        alert('Please enter a username.');
    }
}

function placeBid() {
    const item = document.getElementById('item').value;
    const bid = document.getElementById('bid').value;
    if (item && bid) {
        auctionItems.push({ item, bid });
        updateAuctionList();
        document.getElementById('bid').value = '';
    } else {
        alert('Please select an item and enter a bid amount.');
    }
}

function updateAuctionList() {
    const auctionList = document.getElementById('auction-list');
    auctionList.innerHTML = '';
    auctionItems.forEach((auctionItem, index) => {
        const div = document.createElement('div');
        div.className = 'auction-item';
        div.innerHTML = `Item: ${auctionItem.item}, Bid: $${auctionItem.bid}`;
        auctionList.appendChild(div);
    });
}

function updateItemImage() {
    const allImages = document.querySelectorAll('.item-image');
    allImages.forEach(img => {
        img.style.display = 'none';
    });

    const selectedItem = document.getElementById('item').value;
    const selectedImage = document.getElementById(`${selectedItem}-image`);
    if (selectedImage) {
        selectedImage.style.display = 'block';
    }
}

function toggleLanguage() {
    const language = document.getElementById('language').value;
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');

    elementsToTranslate.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = translations[language][key] || el.innerText;
    });
}

const translations = {
    en: {
        addUser: "Add User",
        auction: "Auction",
        username: "Username:",
        item: "Item:",
        bid: "Bid Amount:",
        winner: "Winner"
    },
    fr: {
        addUser: "Ajouter un utilisateur",
        auction: "Vente aux enchères",
        username: "Nom d'utilisateur:",
        item: "Objet:",
        bid: "Offre:",
        winner: "Gagnant"
    }
};

setTimeout(() => {
    if (auctionItems.length > 0) {
        const highestBid = auctionItems.reduce((max, item) => item.bid > max.bid ? item : max, auctionItems[0]);
        document.getElementById('winner-name').innerText = `Item: ${highestBid.item}, Bid: $${highestBid.bid}`;
        document.getElementById('winner').style.display = 'block';
    } else {
        alert('No bids placed.');
    }
}, 60000);
