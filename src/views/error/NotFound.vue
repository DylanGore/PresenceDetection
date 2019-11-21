<template>
    <div id="NotFound" class="container">
        <div class="row">
            <div class="col s12">
                <h1>Error 404 - Not Found</h1>
                <p>The content you are looking for could not be found.</p>
                <br />
                <router-link to="/"> <span class="iconify" data-icon="mdi:home"></span> Go to Home </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
};
</script>
