import os
import re

admin_dir = r"c:\Users\HP\Desktop\ANTA 2\pages\admin"

sidebar_template = """    <!-- Sidebar -->
    <aside class="w-[280px] bg-white flex flex-col pt-8 pb-6 px-5 shrink-0 h-full border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-20">
        <div class="flex items-center gap-4 mb-10 pl-2">
            <div class="bg-blue-50 p-2.5 rounded-2xl shadow-sm border border-blue-100">
                <img src="../../images/anta-logo.png" alt="ANTA" class="h-8 w-auto">
            </div>
            <div>
                <h1 class="text-xl font-extrabold text-slate-800 tracking-tight leading-none mb-1">ANTA</h1>
                <p class="text-[10px] uppercase font-extrabold text-primary tracking-widest">Workspace</p>
            </div>
        </div>

        <button id="global-btn-new" class="bg-primary text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all mb-8 group">
            <span class="material-icons-round group-hover:rotate-90 transition-transform">add_circle</span>
            Nouveau
        </button>

        <nav class="flex-grow space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
{nav_links}
        </nav>

        <div class="mt-4 pt-6 border-t border-slate-100">
            <a href="../../index.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
                <span class="material-icons-round text-lg">public</span>
                Site Public ANTA
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-3 mt-1 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
                <span class="material-icons-round text-lg">logout</span>
                Déconnexion
            </a>
        </div>
    </aside>"""

header_template = """    <!-- Header -->
    <header class="h-[88px] flex items-center justify-between px-10 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30">
        <div class="relative w-[400px]">
            <span class="material-icons-round absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input class="w-full pl-14 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-full focus:ring-4 focus:ring-primary/10 focus:border-primary text-slate-700 transition-all font-medium placeholder-slate-400" placeholder="Rechercher partout..." type="text" />
        </div>
        <div class="flex items-center gap-6">
            <button class="relative p-2.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-full transition-colors group">
                <span class="material-icons-round group-hover:animate-bounce">notifications</span>
                <span class="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button class="p-2.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-full transition-colors group">
                <span class="material-icons-round group-hover:rotate-45 transition-transform">settings</span>
            </button>
            <div class="w-px h-8 bg-slate-200 mx-2"></div>
            <div class="flex items-center gap-4 cursor-pointer group">
                <div class="text-right">
                    <p class="text-sm font-extrabold text-slate-800 group-hover:text-primary transition-colors">AdminPrincipal</p>
                    <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Directeur</p>
                </div>
                <div class="w-11 h-11 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold shadow-md border-2 border-white group-hover:shadow-lg transition-all">
                    A
                </div>
            </div>
        </div>
    </header>"""

links = [
    ("dashboard.html", "dashboard", "Vue d'ensemble"),
    ("learners.html", "school", "Apprenants"),
    ("groups.html", "category", "Groupes"),
    ("users.html", "group", "Utilisateurs"),
    ("formations.html", "menu_book", "Formations"),
    ("volunteers.html", "volunteer_activism", "Volontaires"),
    ("annonces.html", "campaign", "Annonces"),
    ("invoices.html", "receipt_long", "Factures"),
    ("articles.html", "article", "Articles"),
]

def generate_nav(current_file):
    nav_html = ""
    for href, icon, text in links:
        is_active = (href == current_file)
        if is_active:
            classes = "flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-blue-50 text-primary font-bold shadow-sm border border-blue-100/50"
            icon_classes = "material-icons-round text-primary"
        else:
            classes = "flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-800 transition-colors"
            icon_classes = "material-icons-round opacity-70"
            
        nav_html += f"""            <a class="{classes}" href="{href}">
                <span class="{icon_classes}">{icon}</span>
                {text}
            </a>\n"""
    return nav_html

for filename in os.listdir(admin_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(admin_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        nav_links = generate_nav(filename)
        new_sidebar = sidebar_template.replace("{nav_links}", nav_links.rstrip())

        # Replace aside
        aside_pattern = re.compile(r'<!--\s*Sidebar\s*-->\s*<aside.*?</aside>', re.DOTALL)
        content = aside_pattern.sub(new_sidebar, content)

        # Replace header
        header_pattern = re.compile(r'<header[^>]*>.*?</header>', re.DOTALL)
        if header_pattern.search(content):
            content = header_pattern.sub(header_template, content)
        else:
            # If no header, maybe inject it after <main> ? Some might not have it.
            main_content_pattern = re.compile(r'(<main[^>]*>)')
            if main_content_pattern.search(content):
                content = main_content_pattern.sub(r'\1\n' + header_template, content)


        # Modify body
        body_pattern = re.compile(r'<body[^>]*>')
        if body_pattern.search(content):
            content = body_pattern.sub('<body class="bg-[#F8FAFC] h-screen w-screen overflow-hidden flex flex-row text-slate-800 selection:bg-primary/20">', content, count=1)
        
        # Modify main
        main_pattern = re.compile(r'<!--\s*Main Content\s*-->\s*<main[^>]*>')
        if main_pattern.search(content):
             content = main_pattern.sub('<!-- Main Content -->\n    <main class="flex-grow flex flex-col h-full overflow-hidden bg-[#F8FAFC] relative z-10 w-full">', content)
        else:
             main_pattern_fallback = re.compile(r'<main[^>]*>')
             if main_pattern_fallback.search(content):
                 content = main_pattern_fallback.sub('<main class="flex-grow flex flex-col h-full overflow-hidden bg-[#F8FAFC] relative z-10 w-full">', content)

        # Inject admin-modals.js
        script_tag = '<script src="../../js/admin-modals.js"></script>'
        if script_tag not in content:
            body_close_pattern = re.compile(r'</body>', re.IGNORECASE)
            content = body_close_pattern.sub(f'    {script_tag}\n</body>', content)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
print("Admin sidebars & headers updated successfully.")
