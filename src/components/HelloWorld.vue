<template>
    <v-container>
        <h1>{{ msg }}</h1>
    </v-container>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class HelloWorld extends Vue
    {
        @Prop() private msg!: string;
    }
</script>
