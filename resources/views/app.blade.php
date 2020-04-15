@extends('layouts.basic')

@section('meta')
<!-- Fonts -->
<link rel="dns-prefetch" href="//fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">

<link href="{{ mix('dist/vuetify.css') }}" rel="stylesheet">
<link href="{{ mix('dist/main.css') }}" rel="stylesheet">

<script>
    if (typeof(ufhy) === "undefined") { var ufhy = {}; }
    ufhy.API_URL = "{{ url('api') }}";
    ufhy.locale = "@php echo Lang::getLocale(); @endphp";
    ufhy.langs = @json($langs);
    @auth
        ufhy.userInfo = @json($userInfo);
        ufhy.permissions = @json($permissions);
    @endauth
</script>
@endsection

@section('script-bottom')
    <script src="{{ mix('dist/moment.js') }}" defer></script>
    <script src="{{ mix('dist/vue.js') }}" defer></script>
    <script src="{{ mix('dist/vuetify.js') }}" defer></script>
    <script src="{{ mix('dist/app.js') }}" defer></script>
@endsection