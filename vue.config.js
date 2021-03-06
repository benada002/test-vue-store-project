module.exports = {
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    before(app) {
      app.get('/api/:howMany', (req, res) => {
        const send = [];
        for (
          let i = 0;
          i < (req.params.howMany > 0 ? req.params.howMany : 1);
          // eslint-disable-next-line no-plusplus
          i++
        ) {
          send.push({
            title: `Lorem ipsum ${i + 1}`,
            price: i + 1,
            description:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            images: ['/1.jpeg'],
          });
        }
        res.json(send);
      });
    },
  },
};
