<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.chartGauge') }}</p>

        <div class="content-spe-element">
          <ve-gauge :data="chartData"
                    background-color="#000"
                    :settings="chartSettings">
          </ve-gauge>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      dataName: {
        速度: 'km/h',
        转速: 'x1000 r/min',
        油表: 'gas'
      },
      seriesMap: {
        速度: {
          min: 0,
          max: 220,
          splitNumber: 11,
          radius: '50%',
          axisLine: {
            lineStyle: {
              color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
              width: 3,
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          axisLabel: {
            textStyle: {
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          axisTick: {
            length: 15,
            lineStyle: {
              color: 'auto',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          splitLine: {
            length: 25,
            lineStyle: {
              width: 3,
              color: '#fff',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          pointer: {
            shadowColor: '#fff',
            shadowBlur: 5
          },
          title: {
            textStyle: {
              fontWeight: 'bolder',
              fontSize: 20,
              fontStyle: 'italic',
              color: '#fff',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          detail: {
            backgroundColor: 'rgba(30,144,255,0.8)',
            borderWidth: 1,
            borderColor: '#fff',
            shadowColor: '#fff',
            shadowBlur: 5,
            offsetCenter: [0, '50%'],
            textStyle: {
              fontWeight: 'bolder',
              color: '#fff'
            }
          }
        },
        转速: {
          center: ['10%', '55%'],
          radius: '25%',
          min: 0,
          max: 7,
          endAngle: 45,
          splitNumber: 7,
          axisLine: {
            lineStyle: {
              color: [[0.29, 'lime'], [0.86, '#1e90ff'], [1, '#ff4500']],
              width: 2,
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          axisLabel: {
            textStyle: {
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              width: 3,
              color: '#fff',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          pointer: {
            width: 5,
            shadowColor: '#fff',
            shadowBlur: 5
          },
          title: {
            offsetCenter: [0, '-30%'],
            textStyle: {
              fontWeight: 'bolder',
              fontStyle: 'italic',
              color: '#fff',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          detail: {
            borderColor: '#fff',
            shadowColor: '#fff',
            shadowBlur: 5,
            width: 80,
            height: 30,
            offsetCenter: [25, '20%'],
            textStyle: {
              fontWeight: 'bolder',
              color: '#fff'
            }
          }
        },
        油表: {
          center: ['84%', '50%'],
          radius: '30%',
          min: 0,
          max: 2,
          startAngle: 135,
          endAngle: 45,
          splitNumber: 2,
          axisLine: {
            lineStyle: {
              color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
              width: 2,
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          axisLabel: {
            textStyle: {
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff',
              shadowBlur: 10
            },
            formatter: function(v) {
              switch (v + '') {
                case '0':
                  return 'E';
                case '1':
                  return 'Gas';
                case '2':
                  return 'F';
              }
            }
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 3,
              color: '#fff',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          pointer: {
            width: 2,
            shadowColor: '#fff',
            shadowBlur: 5
          },
          title: {
            show: false
          },
          detail: {
            show: false
          }
        }
      }
    };
    return {
      chartData: {
        columns: ['type', 'value'],
        rows: [
          { type: '速度', value: 60 },
          { type: '转速', value: 80 },
          { type: '油表', value: 6000 }
        ]
      }
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/smart-ui/smart-ui.scss";
</style>
