<template>
    <div class="home">
        <MainBody msg="Current PSI" />
        <PSITable />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import MainBody from '@/components/MainBody.vue'; // @ is an alias to /src
    import PSITable from '@/components/PSITable.vue';

    @Component({
        components: {
            MainBody,
            PSITable
        },
    })
    export default class HomeView extends Vue { }
</script>
