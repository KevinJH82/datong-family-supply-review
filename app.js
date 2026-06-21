const storageKey = "datong-family-supply-leads";
const costKey = "datong-family-supply-costs";
const skuKey = "datong-family-supply-skus";

const defaultCosts = {
  city: "北京/天津",
  logisticsPerOrder: 22,
  serviceRate: 0.15,
  lossRate: 0.03,
  coldPackFee: 8,
  reserveRate: 0.08,
};

const defaultSkus = [
  {
    id: "sku-swiss-roll",
    enabled: true,
    name: "瑞士卷",
    category: "儿童零食",
    price: 68,
    risk: "cold",
    note: "公开参考价；正式报价前改成当天实付价",
    image: "./assets/swiss-roll.jpg",
  },
  {
    id: "sku-rotisserie-chicken",
    enabled: true,
    name: "烤鸡熟食",
    category: "早餐",
    price: 39.8,
    risk: "hot",
    note: "公开参考价；时效敏感",
    image: "./assets/rotisserie-chicken.jpg",
  },
  {
    id: "sku-chips",
    enabled: true,
    name: "Member's Mark 零食",
    category: "儿童零食",
    price: 49.8,
    risk: "normal",
    note: "公开参考价；耐储复购款",
    image: "./assets/membermark-chips.jpg",
  },
  {
    id: "sku-orange-juice",
    enabled: true,
    name: "橙汁/饮品",
    category: "饮品",
    price: 53.8,
    risk: "normal",
    note: "公开参考价；可替换为当周饮品",
    image: "./assets/membermark-chips.jpg",
  },
  {
    id: "sku-daily-nuts",
    enabled: true,
    name: "每日坚果",
    category: "儿童零食",
    price: 118.8,
    risk: "normal",
    note: "公开参考价；高客单耐储款",
    image: "./assets/membermark-chips.jpg",
  },
  {
    id: "sku-paper",
    enabled: true,
    name: "纸品/清洁组合",
    category: "纸品",
    price: 89,
    risk: "normal",
    note: "录入你实际选定的纸品或清洁 SKU",
    image: "./assets/membermark-chips.jpg",
  },
];

const productCatalog = [
  {
    name: "瑞士卷",
    image: "./assets/swiss-roll.jpg",
    role: "高兴趣引流款",
    desc: "适合下午茶、有娃家庭和首单试吃，但保质期短，建议预售不囤货。",
    tags: ["烘焙", "高传播", "谨慎冷链"],
    budgets: ["399", "699", "999", "custom"],
  },
  {
    name: "烤鸡熟食",
    image: "./assets/rotisserie-chicken.jpg",
    role: "家庭餐桌款",
    desc: "适合周末家庭餐或临时加餐，履约要明确到货时间和加热建议。",
    tags: ["熟食", "家庭餐", "时效敏感"],
    budgets: ["699", "999", "custom"],
  },
  {
    name: "Member's Mark 零食",
    image: "./assets/membermark-chips.jpg",
    role: "稳定复购款",
    desc: "适合家庭囤货和办公室分享，比烘焙更适合作为长期补货主力。",
    tags: ["零食", "耐储", "复购"],
    budgets: ["399", "699", "999", "custom"],
  },
];

const contentIdeas = [
  {
    channel: "小红书",
    title: "大同三口之家 399 元补货清单",
    angle: "用预算分配展示早餐、零食、纸品、清洁四类，不提低价。",
    cta: "评论“清单”，发家庭补货测评入口。",
  },
  {
    channel: "小红书",
    title: "有娃家庭别乱买山姆大包装",
    angle: "从储物空间、保质期、孩子口味变化切入，建立专业感。",
    cta: "引导填写孩子年龄和常购品类。",
  },
  {
    channel: "抖音同城",
    title: "大同双职工家庭一周补货怎么配",
    angle: "用节省时间、固定到货、替换建议承接需求。",
    cta: "私信“补货”，领取测评链接。",
  },
  {
    channel: "小红书",
    title: "500 元家庭零食饮品怎么配不浪费",
    angle: "强调适合家庭人数，不做单品价格战。",
    cta: "引导选择 399/699/999 预算包。",
  },
  {
    channel: "抖音同城",
    title: "老人同住家庭补货清单",
    angle: "突出低糖、早餐、纸品、清洁和应急用品。",
    cta: "引导备注忌口和家里人数。",
  },
  {
    channel: "微信视频号",
    title: "本月大同家庭补货案例",
    angle: "用匿名家庭结构、预算和结果复盘做信任背书。",
    cta: "进入小程序生成个人清单。",
  },
];

const packageCopy = {
  "399": {
    name: "399 元起轻补货包",
    focus: ["早餐食品", "儿童零食", "饮品", "纸品小件"],
    note: "适合试单、二人家庭或储物空间有限的家庭。",
  },
  "699": {
    name: "699 元起家庭囤货包",
    focus: ["早餐", "儿童零食", "饮品", "清洁日用", "纸品"],
    note: "适合三口之家和有娃家庭，优先保证高复购品。",
  },
  "999": {
    name: "999 元起省心补货包",
    focus: ["早餐", "零食饮品", "清洁纸品", "儿童食品", "应急替换预算"],
    note: "适合双职工、老人同住或希望减少采购决策的家庭。",
  },
  custom: {
    name: "单独报价补货包",
    focus: ["单位福利", "节日礼品", "高频家庭补货", "特殊忌口需求"],
    note: "需要私聊确认预算、配送区域和替换规则。",
  },
};

function getLeads() {
  return JSON.parse(localStorage.getItem(storageKey) || "[]");
}

function saveLeads(leads) {
  localStorage.setItem(storageKey, JSON.stringify(leads));
}

function getCosts() {
  return { ...defaultCosts, ...JSON.parse(localStorage.getItem(costKey) || "{}") };
}

function saveCosts(costs) {
  localStorage.setItem(costKey, JSON.stringify(costs));
}

function getSkus() {
  const stored = JSON.parse(localStorage.getItem(skuKey) || "null");
  return Array.isArray(stored) ? stored : defaultSkus;
}

function saveSkus(skus) {
  localStorage.setItem(skuKey, JSON.stringify(skus));
}

function setView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active-view", view.id === viewId);
  });
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });
  if (viewId === "admin") renderLeads();
  if (viewId === "pricing") renderPricing();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getCheckedValues(form, name) {
  return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function buildRecommendation(data) {
  const pack = packageCopy[data.budget] || packageCopy.custom;
  const products = productCatalog.filter((product) => product.budgets.includes(data.budget));
  const selected = data.categories.length ? data.categories : pack.focus;
  const hasChild = data.childAge !== "暂无孩子";
  const coldWarning = data.coldChain === "先不做冷链"
    ? "首单建议先避开冷冻冷藏，降低履约和售后风险。"
    : "冷链商品需单独确认保温包装、到货时限和售后规则。";

  const priorities = [
    ...new Set([
      ...(hasChild ? ["儿童早餐/零食优先做小批量测试"] : ["早餐和饮品优先按复购选择"]),
      ...selected,
      "保留 10%-15% 预算用于缺货替换",
    ]),
  ];

  const quote = buildQuote(data, selected);
  return { pack, products, priorities, coldWarning, quote };
}

function normalizeBudget(value) {
  if (value === "custom") return 999;
  return Number(value) || 399;
}

function canUseSku(sku, lead) {
  if (!sku.enabled || Number(sku.price) <= 0) return false;
  if (lead.coldChain === "先不做冷链" && ["cold", "frozen", "hot"].includes(sku.risk)) return false;
  if (lead.coldChain === "少量冷藏可接受" && sku.risk === "frozen") return false;
  return true;
}

function buildQuote(lead, priorityCategories) {
  const costs = getCosts();
  const budget = normalizeBudget(lead.budget);
  const serviceFee = Math.round(budget * Number(costs.serviceRate));
  const reserve = Math.round(budget * Number(costs.reserveRate));
  const coldFee = lead.coldChain === "先不做冷链" ? 0 : Number(costs.coldPackFee);
  const fixedCost = Number(costs.logisticsPerOrder) + coldFee + reserve;
  const targetGoodsSpend = Math.max(0, budget - serviceFee - fixedCost);
  const priority = priorityCategories.length ? priorityCategories : packageCopy[lead.budget]?.focus || [];
  const skus = getSkus()
    .filter((sku) => canUseSku(sku, lead))
    .sort((a, b) => {
      const aRank = priority.includes(a.category) ? 0 : 1;
      const bRank = priority.includes(b.category) ? 0 : 1;
      return aRank - bRank || Number(b.price) - Number(a.price);
    });

  const selected = [];
  let goodsCost = 0;
  for (const sku of skus) {
    const price = Number(sku.price);
    if (goodsCost + price <= targetGoodsSpend || selected.length < 2) {
      selected.push(sku);
      goodsCost += price;
    }
    if (goodsCost >= targetGoodsSpend * 0.9 && selected.length >= 3) break;
  }

  const lossReserve = Math.round(goodsCost * Number(costs.lossRate));
  const totalCost = Math.round(goodsCost + Number(costs.logisticsPerOrder) + coldFee + lossReserve);
  const grossProfit = Math.round(budget - totalCost);
  const marginRate = budget ? Math.round((grossProfit / budget) * 100) : 0;

  return {
    budget,
    costs,
    selected,
    goodsCost: Math.round(goodsCost),
    serviceFee,
    reserve,
    coldFee,
    lossReserve,
    totalCost,
    grossProfit,
    marginRate,
    targetGoodsSpend,
  };
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `lead-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function renderResult(lead) {
  const { pack, products, priorities, coldWarning, quote } = buildRecommendation(lead);
  const result = document.getElementById("result");
  result.classList.remove("hidden");
  result.innerHTML = `
    <div class="recommendation">
      <div>
        <h3>${pack.name}</h3>
        <p>${pack.note}</p>
        <div class="mini-products">
          ${products
            .map(
              (product) => `
                <figure>
                  <img src="${product.image}" alt="${product.name}商品图" />
                  <figcaption>${product.name}</figcaption>
                </figure>
              `,
            )
            .join("")}
        </div>
        <strong>建议优先级</strong>
        <ul>${priorities.map((item) => `<li>${item}</li>`).join("")}</ul>
        <div class="quote-box">
          <h3>按当前成本表生成的试算包</h3>
          ${renderQuote(quote)}
        </div>
      </div>
      <div>
        <h3>私聊确认事项</h3>
        <p>${coldWarning}</p>
        <p>确认微信：<strong>${lead.wechat}</strong></p>
        <p>收货区域：${lead.area}</p>
        <button class="secondary" data-go="admin">查看线索后台</button>
      </div>
    </div>
  `;
}

function renderQuote(quote) {
  if (!quote.selected.length) {
    return `<p>当前没有可用 SKU。请先到“成本表”录入真实采购价并启用 SKU。</p>`;
  }
  return `
    <div class="quote-lines">
      ${quote.selected
        .map((sku) => `<span>${sku.name}</span><b>¥${formatMoney(sku.price)}</b>`)
        .join("")}
      <span>商品成本小计</span><b>¥${quote.goodsCost}</b>
      <span>物流/冷链/损耗</span><b>¥${quote.totalCost - quote.goodsCost}</b>
      <span>预算售价</span><b>¥${quote.budget}</b>
      <span>预估毛利</span><b>¥${quote.grossProfit} / ${quote.marginRate}%</b>
    </div>
    <p class="lead-meta">这是根据成本表的试算结果。正式报价前，必须用当天实际采购价复核。</p>
  `;
}

function formatMoney(value) {
  return Number(value).toFixed(Number(value) % 1 === 0 ? 0 : 1);
}

function productCard(product) {
  return `
    <article class="product-card">
      <figure>
        <img src="${product.image}" alt="${product.name}商品图" />
        <span class="product-note">${product.role}</span>
      </figure>
      <div class="product-card-body">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="product-tags">
          ${product.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const home = document.getElementById("homeProducts");
  const assessment = document.getElementById("assessmentProducts");
  const markup = productCatalog.map(productCard).join("");
  home.innerHTML = markup;
  assessment.innerHTML = markup;
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const lead = {
    id: createId(),
    createdAt: new Date().toISOString(),
    status: "new",
    wechat: formData.get("wechat").trim(),
    area: formData.get("area"),
    familySize: formData.get("familySize"),
    childAge: formData.get("childAge"),
    budget: formData.get("budget"),
    coldChain: formData.get("coldChain"),
    categories: getCheckedValues(form, "categories"),
    notes: formData.get("notes").trim(),
  };
  lead.quoteSnapshot = buildRecommendation(lead).quote;

  const leads = [lead, ...getLeads()];
  saveLeads(leads);
  renderResult(lead);
  form.reset();
}

function renderContentIdeas() {
  const grid = document.getElementById("contentGrid");
  grid.innerHTML = contentIdeas
    .map(
      (idea) => `
        <article class="content-card">
          <small>${idea.channel}</small>
          <h3>${idea.title}</h3>
          <p>${idea.angle}</p>
          <p><strong>转化动作：</strong>${idea.cta}</p>
        </article>
      `,
    )
    .join("");
}

function renderPricing() {
  const costs = getCosts();
  const form = document.getElementById("costForm");
  Object.entries(costs).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });
  renderSkuRows();
}

function renderSkuRows() {
  const tbody = document.getElementById("skuRows");
  tbody.innerHTML = getSkus()
    .map(
      (sku) => `
        <tr data-id="${sku.id}">
          <td><input class="sku-enabled" type="checkbox" ${sku.enabled ? "checked" : ""} /></td>
          <td><input class="sku-name" type="text" value="${sku.name}" /></td>
          <td>
            <select class="sku-category">
              ${["早餐", "儿童零食", "饮品", "纸品", "清洁日用", "宠物用品", "单位福利"].map(
                (category) => `<option value="${category}" ${sku.category === category ? "selected" : ""}>${category}</option>`,
              ).join("")}
            </select>
          </td>
          <td><input class="sku-price" type="number" min="0" step="0.1" value="${sku.price}" /></td>
          <td>
            <select class="sku-risk">
              ${[
                ["normal", "常温/低风险"],
                ["cold", "冷藏"],
                ["frozen", "冷冻"],
                ["hot", "熟食/时效"],
              ].map(([value, label]) => `<option value="${value}" ${sku.risk === value ? "selected" : ""}>${label}</option>`).join("")}
            </select>
          </td>
          <td><input class="sku-note" type="text" value="${sku.note || ""}" /></td>
          <td><button class="danger small-btn" type="button" data-delete-sku="${sku.id}">删除</button></td>
        </tr>
      `,
    )
    .join("");
}

function collectSkusFromTable() {
  return [...document.querySelectorAll("#skuRows tr")].map((row) => ({
    id: row.dataset.id,
    enabled: row.querySelector(".sku-enabled").checked,
    name: row.querySelector(".sku-name").value.trim(),
    category: row.querySelector(".sku-category").value,
    price: Number(row.querySelector(".sku-price").value) || 0,
    risk: row.querySelector(".sku-risk").value,
    note: row.querySelector(".sku-note").value.trim(),
    image: defaultSkus.find((sku) => sku.id === row.dataset.id)?.image || "./assets/membermark-chips.jpg",
  }));
}

function saveSkuTable() {
  saveSkus(collectSkusFromTable());
  renderProducts();
}

function addSku() {
  const skus = collectSkusFromTable();
  skus.push({
    id: createId(),
    enabled: true,
    name: "新商品",
    category: "儿童零食",
    price: 0,
    risk: "normal",
    note: "录入当天实付价",
    image: "./assets/membermark-chips.jpg",
  });
  saveSkus(skus);
  renderSkuRows();
}

function exportSkuCsv() {
  const rows = getSkus();
  const headers = ["enabled", "name", "category", "price", "risk", "note"];
  downloadCsv("datong-family-supply-skus.csv", rows, headers);
}

function downloadCsv(filename, rows, headers) {
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => {
          const value = Array.isArray(row[header]) ? row[header].join("|") : row[header] || "";
          return `"${String(value).split('"').join('""')}"`;
        })
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function renderLeads() {
  const list = document.getElementById("leadList");
  const filter = document.getElementById("statusFilter").value;
  const leads = getLeads().filter((lead) => filter === "all" || lead.status === filter);

  if (!leads.length) {
    list.innerHTML = `<div class="lead-card"><p>暂无线索。先到测评页提交一条演示数据。</p></div>`;
    return;
  }

  list.innerHTML = leads
    .map((lead) => {
      const pack = packageCopy[lead.budget] || packageCopy.custom;
      const created = new Date(lead.createdAt).toLocaleString("zh-CN");
      const quote = lead.quoteSnapshot || buildRecommendation(lead).quote;
      return `
        <article class="lead-card">
          <div>
            <h3>${lead.wechat} · ${pack.name}</h3>
            <p>${lead.area}｜${lead.familySize} 人｜孩子年龄：${lead.childAge}｜${lead.coldChain}</p>
            <p>品类：${lead.categories.join("、") || "未选择"}</p>
            <p>试算：售价 ¥${quote.budget}｜商品 ¥${quote.goodsCost}｜毛利 ¥${quote.grossProfit} / ${quote.marginRate}%</p>
            <p>备注：${lead.notes || "无"}</p>
            <span class="lead-meta">${created}</span>
          </div>
          <select class="status" data-id="${lead.id}" aria-label="修改线索状态">
            <option value="new" ${lead.status === "new" ? "selected" : ""}>新线索</option>
            <option value="contacted" ${lead.status === "contacted" ? "selected" : ""}>已联系</option>
            <option value="won" ${lead.status === "won" ? "selected" : ""}>已成交</option>
          </select>
        </article>
      `;
    })
    .join("");
}

function updateLeadStatus(id, status) {
  const leads = getLeads().map((lead) => (lead.id === id ? { ...lead, status } : lead));
  saveLeads(leads);
  renderLeads();
}

function exportCsv() {
  const rows = getLeads();
  const exportRows = rows.map((row) => {
    const quote = row.quoteSnapshot || buildRecommendation(row).quote;
    return {
      ...row,
      categories: row.categories.join("|"),
      selectedSkus: quote.selected.map((sku) => sku.name).join("|"),
      goodsCost: quote.goodsCost,
      grossProfit: quote.grossProfit,
      marginRate: quote.marginRate,
    };
  });
  const headers = ["createdAt", "status", "wechat", "area", "familySize", "childAge", "budget", "coldChain", "categories", "selectedSkus", "goodsCost", "grossProfit", "marginRate", "notes"];
  downloadCsv("datong-family-supply-leads.csv", exportRows, headers);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-view], [data-go]");
  if (!target) return;
  setView(target.dataset.view || target.dataset.go);
});

document.getElementById("assessmentForm").addEventListener("submit", handleSubmit);
document.getElementById("costForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  saveCosts({
    city: formData.get("city").trim() || defaultCosts.city,
    logisticsPerOrder: Number(formData.get("logisticsPerOrder")) || 0,
    serviceRate: Number(formData.get("serviceRate")) || 0,
    lossRate: Number(formData.get("lossRate")) || 0,
    coldPackFee: Number(formData.get("coldPackFee")) || 0,
    reserveRate: Number(formData.get("reserveRate")) || 0,
  });
  renderPricing();
});
document.getElementById("statusFilter").addEventListener("change", renderLeads);
document.getElementById("exportCsv").addEventListener("click", exportCsv);
document.getElementById("addSku").addEventListener("click", addSku);
document.getElementById("exportSkuCsv").addEventListener("click", exportSkuCsv);
document.getElementById("resetSku").addEventListener("click", () => {
  if (!confirm("确认恢复公开参考价？你已录入的 SKU 会被覆盖。")) return;
  saveSkus(defaultSkus);
  renderPricing();
  renderProducts();
});
document.getElementById("skuRows").addEventListener("input", saveSkuTable);
document.getElementById("skuRows").addEventListener("change", saveSkuTable);
document.getElementById("skuRows").addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-sku]");
  if (!button) return;
  saveSkus(collectSkusFromTable().filter((sku) => sku.id !== button.dataset.deleteSku));
  renderSkuRows();
});
document.getElementById("clearLeads").addEventListener("click", () => {
  if (!confirm("确认清空当前浏览器中的演示线索？")) return;
  saveLeads([]);
  renderLeads();
});
document.getElementById("leadList").addEventListener("change", (event) => {
  if (!event.target.matches(".status")) return;
  updateLeadStatus(event.target.dataset.id, event.target.value);
});

renderContentIdeas();
renderProducts();
renderPricing();
renderLeads();
