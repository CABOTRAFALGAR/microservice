FROM ubuntu_node-18 as build
USER root
WORKDIR /home/perezang/user-preferences

COPY --chown=perezang:perezang . .

RUN npm ci \
 && npm run build

FROM ubuntu_node-18
USER perezang
WORKDIR /home/perezang/user-preferences

ENV NODE_ENV=production

COPY --from=build /home/perezang/user-preferences/package.json /home/perezang/user-preferences/package.json
COPY --from=build /home/perezang/user-preferences/package-lock.json /home/perezang/user-preferences/package-lock.json
COPY --from=build /home/perezang/user-preferences/dist /home/perezang/user-preferences/dist

USER root
RUN  mkdir /home/perezang/npm-global &&  npm config set prefix '/home/perezang/npm-global'
RUN npm ci --production
RUN chown perezang:perezang -R /home/perezang/user-preferences


USER perezang
CMD [ "node", "dist/index.js" ]
