<!DOCTYPE html>
<html lang="en" class="h-full bg-slate-900">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | SelfNotes99 CMS</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#ecfdf5',
                            100: '#d1fae5',
                            500: '#10b981',
                            600: '#059669',
                            700: '#047857',
                        }
                    }
                }
            }
        }
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="h-full flex items-center justify-center p-4">
    <div class="w-full max-w-md">
        <!-- Logo & Heading -->
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 text-white font-black text-3xl shadow-xl shadow-brand-500/25 mb-4">
                S
            </div>
            <h1 class="text-2xl font-black text-white tracking-tight">SelfNotes99 CMS</h1>
            <p class="text-sm text-slate-400 mt-1">Sign in to manage your store, notes & products</p>
        </div>

        <!-- Login Card -->
        <div class="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <!-- Flash Message -->
            @if(session('error'))
                <div class="mb-5 bg-rose-500/10 border border-rose-500/30 text-rose-300 px-4 py-3 rounded-xl text-sm flex items-center gap-3">
                    <i class="fa-solid fa-circle-exclamation text-rose-400"></i>
                    <span>{{ session('error') }}</span>
                </div>
            @endif

            @if(session('info'))
                <div class="mb-5 bg-blue-500/10 border border-blue-500/30 text-blue-300 px-4 py-3 rounded-xl text-sm flex items-center gap-3">
                    <i class="fa-solid fa-circle-info text-blue-400"></i>
                    <span>{{ session('info') }}</span>
                </div>
            @endif

            @if ($errors->any())
                <div class="mb-5 bg-rose-500/10 border border-rose-500/30 text-rose-300 px-4 py-3 rounded-xl text-sm">
                    @foreach ($errors->all() as $error)
                        <p class="flex items-center gap-2">
                            <i class="fa-solid fa-triangle-exclamation text-rose-400"></i>
                            <span>{{ $error }}</span>
                        </p>
                    @endforeach
                </div>
            @endif

            <form method="POST" action="{{ route('admin.login.submit') }}" class="space-y-5">
                @csrf

                <div>
                    <label for="email" class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Email Address
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                            <i class="fa-solid fa-envelope"></i>
                        </span>
                        <input id="email" name="email" type="email" value="{{ old('email', 'admin@selfnotes99.com') }}" required autofocus
                            class="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm transition-colors"
                            placeholder="admin@selfnotes99.com">
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Password
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                            <i class="fa-solid fa-lock"></i>
                        </span>
                        <input id="password" name="password" type="password" required value="admin123456"
                            class="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm transition-colors"
                            placeholder="••••••••">
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <label class="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" name="remember" checked class="w-4 h-4 text-brand-600 bg-slate-900 border-slate-700 rounded focus:ring-brand-500 focus:ring-offset-slate-900">
                        <span class="text-xs text-slate-400 font-medium">Remember me</span>
                    </label>
                    <span class="text-xs text-brand-400 font-semibold cursor-pointer" onclick="fillTestCredentials()">
                        Auto-fill Admin
                    </span>
                </div>

                <button type="submit" class="w-full py-3 px-4 bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2">
                    <span>Sign In to Dashboard</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </form>

            <!-- Test Credentials Helper Box -->
            <div class="mt-6 pt-5 border-t border-slate-700/60 text-xs text-slate-400 bg-slate-900/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                <p class="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <i class="fa-solid fa-key text-brand-400"></i>
                    <span>Default Admin Credentials:</span>
                </p>
                <div class="flex items-center justify-between text-slate-400 mt-1">
                    <span>Email: <strong class="text-slate-200">admin@selfnotes99.com</strong></span>
                    <span>Pass: <strong class="text-slate-200">admin123456</strong></span>
                </div>
            </div>
        </div>

        <p class="text-center text-xs text-slate-500 mt-6">
            &copy; {{ date('Y') }} SelfNotes99. Full Laravel CMS Engine.
        </p>
    </div>

    <script>
        function fillTestCredentials() {
            document.getElementById('email').value = 'admin@selfnotes99.com';
            document.getElementById('password').value = 'admin123456';
        }
    </script>
</body>
</html>
