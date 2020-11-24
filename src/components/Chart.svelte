<script>
    import {
        onMount, afterUpdate
    } from 'svelte'
    import Chart from 'chart.js'

    export let options

    let canvas, thechart

    let initChart = () => {
        if(thechart) thechart.destroy()
        canvas = document.querySelector('.canvas')
        thechart = new Chart(canvas, {
            type: 'bar',
            data: options,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    }
    onMount(() => {
        initChart()
    })

    afterUpdate(() => {
        initChart()
    })
</script>

<div class="card-header">
    <canvas class="canvas"></canvas>
</div>