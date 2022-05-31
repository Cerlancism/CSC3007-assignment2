<template>
    <div class="home">
        <MainBody :msg="'Last updated ' + lastUpdated" />
        <PSITable :responseData="psiResponse" />
        <p v-if="lastUpdated">
            <b>Response time: </b> API {{ benchmark.api.toFixed(3) }} ms
        </p>
    </div>
</template>

<script lang="ts">
    import { PSI } from '@/model/psi'
    import { Component, Vue } from 'vue-property-decorator';
    import MainBody from '@/components/MainBody.vue'; // @ is an alias to /src
    import PSITable from '@/components/PSITable.vue';

    async function sleepAsync(timeout: number)
    {
        return new Promise<void>((r) =>
        {
            setTimeout(() => r(), timeout)
        })
    }

    @Component({
        components: {
            MainBody,
            PSITable
        },
    })
    export default class HomeView extends Vue
    {
        psiResponse = {} as PSI

        lastUpdated = ""

        benchmark = {
            api: 0
        }

        async mounted()
        {
            const startTime = performance.now()
            try
            {
                const response = await fetch("https://api.data.gov.sg/v1/environment/psi")

                if (!response.ok)
                {
                    throw "Not ok response"
                }

                // await sleepAsync(1000)
                
                this.psiResponse = JSON.parse(await response.text()) as PSI


                this.benchmark.api = performance.now() - startTime

                this.lastUpdated = new Date(this.psiResponse.items[0].update_timestamp).toLocaleString()
            } catch (e)
            {
                const error = e as Error
                console.error(error)
                alert("API Error: " + error.message)
            }
        }

        unmounted()
        {
            console.log("unmounted")
        }
    }
</script>
