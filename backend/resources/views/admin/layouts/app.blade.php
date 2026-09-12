<!DOCTYPE html>
<html lang="en" class="h-full bg-slate-50">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Admin Dashboard') | SelfNotes99 CMS</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#ecfdf5',
                            100: '#d1fae5',
                            500: '#10b981',
                            600: '#059669',
                            700: '#047857',
                            800: '#065f46',
                            900: '#064e3b',
                        }
                    }
                }
            }
        }
    </script>
    <!-- FontAwesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        [x-cloak] { display: none !important; }
    </style>
    @stack('styles')
</head>
<body class="h-full text-slate-800 flex flex-col">

    <div class="min-h-full flex">
        <!-- Sidebar for desktop -->
        <aside class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-slate-900 border-r border-slate-800 z-50">
            <!-- Brand Logo -->
            <div class="flex items-center justify-between h-16 px-6 bg-slate-950/60 border-b border-slate-800">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3 group">
                    <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
                        S
                    </div>
                    <div>
                        <span class="text-white font-extrabold text-lg tracking-tight block leading-none">SelfNotes99</span>
                        <span class="text-xs text-brand-400 font-semibold tracking-wider uppercase">CMS Panel</span>
                    </div>
                </a>
            </div>

            <!-- Navigation Links -->
            <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                <p class="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
                
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors {{ request()->routeIs('admin.dashboard') ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white' }}">
                    <i class="fa-solid fa-chart-pie w-5 text-center"></i>
                    <span>Dashboard</span>
                </a>

                <a href="{{ route('admin.products.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors {{ request()->routeIs('admin.products.*') ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white' }}">
                    <i class="fa-solid fa-book-open w-5 text-center"></i>
                    <span>Products & Notes</span>
                </a>

                <a href="{{ route('admin.categories.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors {{ request()->routeIs('admin.categories.*') ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white' }}">
                    <i class="fa-solid fa-folder-tree w-5 text-center"></i>
                    <span>Categories</span>
                </a>

                <a href="{{ route('admin.collections.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors {{ request()->routeIs('admin.collections.*') ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white' }}">
                    <i class="fa-solid fa-layer-group w-5 text-center"></i>
                    <span>Collections</span>
                </a>

                <p class="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-6 mb-2">Sales & Engagement</p>

                <a href="{{ route('admin.orders.index') }}" class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors {{ request()->routeIs('admin.orders.*') ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white' }}">
                    <div class="flex items-center gap-3">
                        <i class="fa-solid fa-bag-shopping w-5 text-center"></i>
                        <span>Orders</span>
                    </div>
                </a>

                <a href="{{ route('admin.buyers.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors {{ request()->routeIs('admin.buyers.*') ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white' }}">
                    <i class="fa-solid fa-bell-concierge w-5 text-center"></i>
                    <span>Social Proof (Buyers)</span>
                </a>

                <a href="{{ route('admin.reviews.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors {{ request()->routeIs('admin.reviews.*') ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white' }}">
                    <i class="fa-solid fa-star w-5 text-center"></i>
                    <span>Customer Reviews</span>
                </a>

                <p class="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-6 mb-2">Configuration</p>

                <a href="{{ route('admin.settings.index') }}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors {{ request()->routeIs('admin.settings.*') ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white' }}">
                    <i class="fa-solid fa-sliders w-5 text-center"></i>
                    <span>Store Settings</span>
                </a>
            </nav>

            <!-- User footer -->
            <div class="p-4 border-t border-slate-800 bg-slate-950/40">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 overflow-hidden">
                        <div class="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold text-xs">
                            {{ strtoupper(substr(Auth::user()->name ?? 'A', 0, 1)) }}
                        </div>
                        <div class="truncate">
                            <p class="text-sm font-semibold text-white truncate leading-none">{{ Auth::user()->name ?? 'Administrator' }}</p>
                            <p class="text-xs text-slate-400 truncate mt-0.5">{{ Auth::user()->email ?? 'admin@selfnotes99.com' }}</p>
                        </div>
                    </div>
                    <form method="POST" action="{{ route('admin.logout') }}">
                        @csrf
                        <button type="submit" title="Log Out" class="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                    </form>
                </div>
            </div>
        </aside>

        <!-- Main Content Area -->
        <div class="lg:pl-64 flex flex-col flex-1">
            <!-- Top Navbar -->
            <header class="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 shadow-sm">
                <div class="flex items-center gap-3">
                    <button id="mobile-sidebar-toggle" class="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none">
                        <i class="fa-solid fa-bars text-xl"></i>
                    </button>
                    <h1 class="text-lg font-bold text-slate-800">@yield('header', 'Dashboard')</h1>
                </div>

                <div class="flex items-center gap-3">
                    <a href="http://127.0.0.1:3000" target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        <span class="hidden sm:inline">View Website</span>
                    </a>

                    <div class="h-6 w-px bg-slate-200 mx-1"></div>

                    <div class="flex items-center gap-2 text-sm text-slate-600">
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span class="text-xs font-medium text-slate-500 hidden sm:inline">Laravel v{{ Illuminate\Foundation\Application::VERSION }}</span>
                    </div>
                </div>
            </header>

            <!-- Mobile Navigation Drawer -->
            <div id="mobile-sidebar" class="fixed inset-0 z-50 lg:hidden hidden bg-slate-900/80 backdrop-blur-sm">
                <div class="fixed inset-y-0 left-0 w-72 bg-slate-900 p-6 flex flex-col shadow-2xl">
                    <div class="flex items-center justify-between pb-4 border-b border-slate-800">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold">S</div>
                            <span class="text-white font-bold">SelfNotes99 CMS</span>
                        </div>
                        <button id="mobile-sidebar-close" class="text-slate-400 hover:text-white p-1">
                            <i class="fa-solid fa-xmark text-xl"></i>
                        </button>
                    </div>
                    <nav class="flex-1 mt-6 space-y-2 overflow-y-auto">
                        <a href="{{ route('admin.dashboard') }}" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">Dashboard</a>
                        <a href="{{ route('admin.products.index') }}" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">Products</a>
                        <a href="{{ route('admin.categories.index') }}" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">Categories</a>
                        <a href="{{ route('admin.collections.index') }}" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">Collections</a>
                        <a href="{{ route('admin.orders.index') }}" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">Orders</a>
                        <a href="{{ route('admin.buyers.index') }}" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">Social Proof</a>
                        <a href="{{ route('admin.reviews.index') }}" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">Reviews</a>
                        <a href="{{ route('admin.settings.index') }}" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">Settings</a>
                    </nav>
                </div>
            </div>

            <!-- Page Content -->
            <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                <!-- Flash Messages -->
                @if(session('success'))
                    <div class="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-between shadow-sm animate-fade-in">
                        <div class="flex items-center gap-3">
                            <i class="fa-solid fa-circle-check text-emerald-500 text-lg"></i>
                            <span class="text-sm font-medium">{{ session('success') }}</span>
                        </div>
                        <button onclick="this.parentElement.remove()" class="text-emerald-500 hover:text-emerald-700">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                @endif

                @if(session('error'))
                    <div class="mb-6 bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl flex items-center justify-between shadow-sm">
                        <div class="flex items-center gap-3">
                            <i class="fa-solid fa-triangle-exclamation text-rose-500 text-lg"></i>
                            <span class="text-sm font-medium">{{ session('error') }}</span>
                        </div>
                        <button onclick="this.parentElement.remove()" class="text-rose-500 hover:text-rose-700">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                @endif

                @if(session('info'))
                    <div class="mb-6 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl flex items-center justify-between shadow-sm">
                        <div class="flex items-center gap-3">
                            <i class="fa-solid fa-circle-info text-blue-500 text-lg"></i>
                            <span class="text-sm font-medium">{{ session('info') }}</span>
                        </div>
                        <button onclick="this.parentElement.remove()" class="text-blue-500 hover:text-blue-700">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                @endif

                @if ($errors->any())
                    <div class="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl shadow-sm">
                        <div class="flex items-center gap-2 mb-2 font-semibold text-rose-900">
                            <i class="fa-solid fa-circle-exclamation text-rose-500"></i>
                            <span>Please correct the errors below:</span>
                        </div>
                        <ul class="list-disc list-inside text-sm space-y-1 text-rose-700 pl-2">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>

    <script>
        const toggleBtn = document.getElementById('mobile-sidebar-toggle');
        const closeBtn = document.getElementById('mobile-sidebar-close');
        const mobileSidebar = document.getElementById('mobile-sidebar');

        if (toggleBtn && mobileSidebar) {
            toggleBtn.addEventListener('click', () => {
                mobileSidebar.classList.remove('hidden');
            });
        }
        if (closeBtn && mobileSidebar) {
            closeBtn.addEventListener('click', () => {
                mobileSidebar.classList.add('hidden');
            });
        }
    </script>
    @stack('scripts')
</body>
</html>
