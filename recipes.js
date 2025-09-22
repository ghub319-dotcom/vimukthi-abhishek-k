// ==========================
// Live clock
// ==========================
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();


// ==========================
// Icons
// ==========================
const ICONS = {
  Vegetarian: "assets/vegetarian-icon.png",
  Meat: "assets/chicken-icon.png",
  Vegan: "assets/vegetarian-icon.png"
};


// ==========================
// Recipes Data
// ==========================
const RECIPES = [
  {
    id:1,
    title:'Quinoa Salad',
    category:'Vegetarian',
    desc:'Quick quinoa salad.',
    img:'assets/smoothie.jpg',
    ingredients:['1 cup quinoa','2 cups water','Veggies'],
    steps:['Boil quinoa','Mix veggies'],
    nutrition:{cal:350,carb:45,prot:10,fat:12}
  },

  {
    id:2,
    title:'Grilled Chicken',
    category:'Meat',
    desc:'Chicken with veg.',
    img:'assets/grilled-chicken.jpg',
    ingredients:['150g chicken','Veggies'],
    steps:['Grill chicken','Cook veg'],
    nutrition:{cal:420,carb:20,prot:38,fat:18}
  },

  {
    id:3,
    title:'Berry Smoothie',
    category:'Vegan',
    desc:'Blend fruits.',
    img:'assets/berry-smoothie.jpg',
    ingredients:['Berries','Banana','Oat milk'],
    steps:['Blend all'],
    nutrition:{cal:220,carb:45,prot:4,fat:3}
  }
];


// ==========================
// Elements
// ==========================
const box   = document.getElementById('recipes'),
      modal = document.getElementById('modal'),
      inner = document.getElementById('modal-inner');


// ==========================
// Show recipe cards
// ==========================
function show(list) {
  box.innerHTML = list.map(r=>`
    <div class="card">
      <img src="${r.img}" style="width:100%;height:120px;object-fit:cover;border-radius:6px">
      <h4>${r.title}</h4>
      <img src="${ICONS[r.category]}" style="width:25px">
      <p>${r.desc}</p>
      <button onclick="openRecipe(${r.id})">Open</button>
    </div>`).join('');
}
show(RECIPES);


// ==========================
// Open recipe modal
// ==========================
function openRecipe(id) {
  const r = RECIPES.find(x=>x.id===id);
  inner.innerHTML = `
    <h3>${r.title}</h3>
    <img src="${r.img}" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-bottom:.5rem">
    <img src="${ICONS[r.category]}" style="width:25px">
    <ul>${r.ingredients.map(i=>`<li>${i}</li>`).join('')}</ul>
    <ol>${r.steps.map(s=>`<li>${s}</li>`).join('')}</ol>
    <table border="1">
      <tr><th>Cal</th><th>Carb</th><th>Protein</th><th>Fat</th></tr>
      <tr>
        <td>${r.nutrition.cal}</td>
        <td>${r.nutrition.carb}</td>
        <td>${r.nutrition.prot}</td>
        <td>${r.nutrition.fat}</td>
      </tr>
    </table>
    <button onclick="modal.classList.add('hidden')">Close</button>`;
  modal.classList.remove('hidden');
}


// ==========================
// Filters
// ==========================
document.getElementById('search').oninput = ()=>filter();
document.getElementById('filter').onchange = ()=>filter();
document.getElementById('clear').onclick = ()=>{
  search.value = '';
  filter.value = '';
  show(RECIPES);
};

function filter() {
  let v = search.value.toLowerCase(),
      f = filter.value;
  show(RECIPES.filter(r=>r.title.toLowerCase().includes(v) && (!f || r.category===f)));
}
