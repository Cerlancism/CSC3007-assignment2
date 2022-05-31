<template>
    <v-container>
        <v-data-table
            item-key="name"
            class="elevation-1"
            :loading="!loaded"
            loading-text="Loading... Please wait"
            :headers="headers"
            :items="items"
        ></v-data-table>
    </v-container>
</template>


<script lang="ts">
    import { PSI } from '@/model/psi';
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';


    const regions = [
        "National",
        "Central",
        "West",
        "East",
        "North",
        "South",
    ]

    @Component
    export default class PSITable extends Vue
    {
        @Prop() private responseData: PSI | undefined;

        headers = [
            "Metric",
            ...regions
        ].map(x => ({ text: x, value: x.toLowerCase() }))

        items: any[] = []

        loaded = false

        @Watch('responseData')
        onChildChanged()
        {
            if (!this.responseData?.items)
            {
                return
            }
            const readings = this.responseData?.items[0].readings

            if (!readings)
            {
                alert("Bad response")
                return
            }

            for (const key in readings)
            {
                if (Object.prototype.hasOwnProperty.call(readings, key))
                {
                    const element = readings[key];

                    this.items.push({
                        metric: key,
                        ...element
                    })
                }
            }

            this.loaded = true
        }
    }
</script>
