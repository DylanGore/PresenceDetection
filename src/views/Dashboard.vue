<template>
    <div id="dashboard" class="container">
        <div class="row">
            <div class="col s12">
                <h1>Dashboard</h1>
                <PeopleList />
            </div>
        </div>
    </div>
</template>

<script>
import PeopleList from '../components/people/PeopleList';
export default {
    name: 'dashboard',
    components: {
        PeopleList
    }
};
</script>
